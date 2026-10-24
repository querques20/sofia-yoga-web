"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACTO, enlaceWhatsApp, MENSAJES, type Tema } from "@/lib/contacto";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IconoCorreo, IconoWhatsApp } from "../Iconos";
import { Magnetique } from "../Magnetique";

// los temas para elegir: cada uno escribe su mensaje en la burbuja
const TEMAS: { tema: Tema; texto: string }[] = [
  { tema: "prenatal", texto: "Yoga prénatal" },
  { tema: "postPartum", texto: "Post-partum" },
  { tema: "cours", texto: "Cours de yoga" },
  { tema: "prive", texto: "Cours privé" },
  { tema: "atelier", texto: "Atelier" },
  { tema: "programme", texto: "Le programme en ligne" },
  { tema: "autre", texto: "Autre chose" },
];

/**
 * Para escribirle sin pensar cómo arrancar: elegís el tema, el mensaje se escribe solo en la burbuja (se puede
 * cambiar) y el botón lo abre en WhatsApp o en el mail. Nada se manda solo: lo manda la persona desde ahí
 */
export function Composeur() {
  const [tema, setTema] = useState<Tema | null>(null);
  const [mensaje, setMensaje] = useState("");
  const escritura = useRef<gsap.core.Tween | null>(null);
  const quieto = useReducedMotion();

  useEffect(() => () => void escritura.current?.kill(), []);

  const elegir = (nuevo: Tema) => {
    setTema(nuevo);
    const texto = MENSAJES[nuevo];
    escritura.current?.kill();
    if (quieto) {
      setMensaje(texto);
      return;
    }
    // se escribe de a una letra, rápido, como si alguien lo tipeara
    const estado = { letras: 0 };
    escritura.current = gsap.to(estado, {
      letras: texto.length,
      duration: Math.min(1.3, texto.length * 0.016),
      ease: "none",
      onUpdate: () => setMensaje(texto.slice(0, Math.round(estado.letras))),
    });
  };

  const texto = mensaje.trim();
  const correo = `mailto:${CONTACTO.email}?subject=${encodeURIComponent("Sofia Yoga")}${texto ? `&body=${encodeURIComponent(texto)}` : ""}`;

  return (
    <div className="rounded-[1.75rem] bg-arena p-6 lg:p-8">
      <p id="composeur-temas" className="font-bold">
        De quoi veux-tu parler&nbsp;?
      </p>
      <div role="group" aria-labelledby="composeur-temas" className="mt-4 flex flex-wrap gap-2">
        {TEMAS.map((t) => (
          <button
            key={t.tema}
            type="button"
            aria-pressed={tema === t.tema}
            onClick={() => elegir(t.tema)}
            className="rounded-full border border-verde/25 px-4 py-2 text-[0.98rem] font-bold transition-colors duration-300 hover:bg-salvia-clara aria-pressed:border-verde aria-pressed:bg-verde aria-pressed:text-pagina"
          >
            {t.texto}
          </button>
        ))}
      </div>

      <label htmlFor="composeur-mensaje" className="mt-7 block font-bold">
        Ton message
      </label>
      {/* la burbuja: una esquina menos redonda, como la colita de un mensaje */}
      <textarea
        id="composeur-mensaje"
        rows={4}
        value={mensaje}
        placeholder={"Bonjour Sofia !"}
        onChange={(e) => {
          escritura.current?.kill();
          setMensaje(e.target.value);
        }}
        className="mt-3 w-full resize-none rounded-[1.4rem] rounded-br-md bg-salvia-clara p-5 text-[1.1rem] leading-relaxed placeholder:text-verde/50"
      />

      <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
        <Magnetique>
          <a className="boton" href={enlaceWhatsApp(texto || undefined)} target="_blank" rel="noopener noreferrer">
            <IconoWhatsApp className="h-5 w-5" />
            Continuer sur WhatsApp
          </a>
        </Magnetique>
        <a className="enlace inline-flex items-center gap-2 font-bold" href={correo}>
          <IconoCorreo className="h-5 w-5" />
          Écrire un e-mail
        </a>
      </div>
      <p className="mt-5 text-[0.95rem] opacity-75">Le message s’ouvre dans WhatsApp ou dans ton e-mail&nbsp;: tu peux encore le modifier avant de l’envoyer.</p>
    </div>
  );
}
