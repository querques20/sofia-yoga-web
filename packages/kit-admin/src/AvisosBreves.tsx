"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AvisoBreve } from "./avisos-breves/AvisoBreve";
import { tomarElDeAntes } from "./avisos-breves/breve";
import { quitar, sumar, type Breve, type BreveEnCola } from "./avisos-breves/cola";
import { Avisar } from "./avisos-breves/contexto";

/** Lo que oye el lector de un aviso: su texto, su detalle si es una frase, y cómo llegar a su acción. */
function paraElLector(breve: Breve): string {
  const detalle = typeof breve.detalle === "string" ? ` ${breve.detalle}` : "";
  const accion = breve.accion ? ` ${breve.accion.etiqueta}: F8 lleva al aviso.` : "";
  return `${breve.texto}.${detalle}${accion}`;
}

/**
 * Los avisos breves del admin (DESIGN.md §11, «Avisos breves»): lo que pasó
 * con una acción, que se va solo. Se monta una vez en el layout, así sigue
 * entre pantallas; abajo a la derecha, y en el celular arriba de la barra de
 * acciones. Hasta tres apilados, el más nuevo arriba (`avisos-breves/cola.ts`).
 * Se muestran con `useAvisoBreve` (`avisos-breves/contexto.ts`) y se arman con
 * `breveDe` o, para después de recargar, `avisarDespues`
 * (`avisos-breves/breve.ts`). Lo que se queda —el error de un campo, el
 * choque, un estado— va donde va, nunca acá. No sabe de ED.
 *
 * Para el lector, dos regiones que existen desde el montaje (una `status` y
 * una `alert`) dicen cada aviso: una que aparece ya llena no siempre se
 * anuncia. F8 lleva el foco al aviso más nuevo sin robarlo nunca; al cerrarse
 * con el foco adentro, el foco vuelve a donde estaba.
 */
export function AvisosBreves({ children }: { children: React.ReactNode }) {
  const [cola, setCola] = useState<BreveEnCola[]>([]);
  const [anuncio, setAnuncio] = useState({ status: "", alerta: "", vez: 0 });
  const siguiente = useRef(0);
  const region = useRef<HTMLDivElement>(null);
  const deDondeVino = useRef<HTMLElement | null>(null);

  const avisar = useCallback((breve: Breve) => {
    siguiente.current += 1;
    const nuevo = { ...breve, id: siguiente.current };
    setCola((actual) => sumar(actual, nuevo));
    const texto = paraElLector(breve);
    setAnuncio((a) => ({ status: breve.tono === "error" ? a.status : texto, alerta: breve.tono === "error" ? texto : a.alerta, vez: a.vez + 1 }));
    return nuevo.id;
  }, []);

  const cerrar = useCallback((id: number) => {
    const conFoco = region.current?.contains(document.activeElement) ?? false;
    setCola((actual) => quitar(actual, id));
    if (!conFoco) return;
    // El nodo se va con el foco adentro: vuelve a lo de antes, en el turno siguiente.
    setTimeout(() => {
      const antes = deDondeVino.current;
      if (antes?.isConnected) antes.focus();
    });
  }, []);

  // F8 lleva al aviso más nuevo, a su acción o a su ×.
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key !== "F8") return;
      const boton = region.current?.querySelector<HTMLElement>("button");
      if (!boton) return;
      e.preventDefault();
      boton.focus();
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, []);

  // El que dejó una acción antes de recargar (`avisarDespues`): se lee una vez, en el turno siguiente.
  useEffect(() => {
    const reloj = setTimeout(() => {
      const deAntes = tomarElDeAntes();
      if (deAntes) avisar(deAntes);
    });
    return () => clearTimeout(reloj);
  }, [avisar]);

  const valor = useMemo(() => ({ avisar, cerrar }), [avisar, cerrar]);
  // Un carácter invisible que alterna: el mismo texto dos veces seguidas también se anuncia.
  const marca = anuncio.vez % 2 ? "​" : "";
  return (
    <Avisar value={valor}>
      {children}
      <div role="status" className="sr-only">
        {anuncio.status ? anuncio.status + marca : ""}
      </div>
      <div role="alert" className="sr-only">
        {anuncio.alerta ? anuncio.alerta + marca : ""}
      </div>
      <div
        ref={region}
        aria-label="Avisos (F8)"
        role="region"
        onFocus={(e) => {
          if (!(e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) deDondeVino.current = e.relatedTarget instanceof HTMLElement ? e.relatedTarget : null;
        }}
        className="pointer-events-none fixed inset-x-4 bottom-24 z-30 flex flex-col items-end gap-2 lg:inset-x-auto lg:right-6 lg:bottom-6"
      >
        {cola.map((breve) => (
          <AvisoBreve key={breve.id} breve={breve} alCerrar={cerrar} />
        ))}
      </div>
    </Avisar>
  );
}
