import { puede } from "@sofia/auth";
import { BotonEnlace, Encabezado, PantallaDeLista } from "@sofia/kit-admin";
import { MODULOS } from "@/admin/armazon/barra-lateral/modulos";
import type { DatosDelInicio } from "@/datos/inicio/inicio";
import { ActividadReciente } from "./ActividadReciente";

/** El primer nombre de la cuenta, para el saludo: «Sofia Costa» → «Sofia». */
function primerNombre(nombre: string): string {
  return nombre.trim().split(/\s+/)[0] ?? "";
}

/**
 * El Inicio del admin: el saludo, los accesos rápidos de los módulos que usás
 * y la actividad reciente. Sin primario: nada es «la» acción de esta
 * pantalla. Los pendientes y los números de la semana se suman acá cuando
 * haya módulos que los tengan.
 */
export function Inicio({ datos, rol }: { datos: DatosDelInicio; rol: unknown }) {
  const nombre = primerNombre(datos.nombre);
  const accesos = MODULOS.flatMap((m) => (m.accesoRapido && (!m.capacidad || puede(rol, m.capacidad)) ? [m.accesoRapido] : []));
  return (
    <PantallaDeLista>
      <Encabezado
        titulo={nombre ? `Hola, ${nombre}` : "Hola"}
        acciones={
          accesos.length
            ? accesos.map((a) => (
                <BotonEnlace key={a.href} variante="secundario" href={a.href}>
                  {a.etiqueta}
                </BotonEnlace>
              ))
            : undefined
        }
      />
      <ActividadReciente eventos={datos.actividad} verActividad={datos.verActividad} />
    </PantallaDeLista>
  );
}
