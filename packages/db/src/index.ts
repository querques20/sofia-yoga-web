// La superficie pública de @sofia/db. Lo que no sale por acá es interno.
//
// Regla del paquete: **nada de dominio del sitio adentro.** Si alguna vez
// aparece la palabra «clase», «horario» o «precio» en este paquete, está mal
// puesto y va a `src/datos/`.

export { urlDeLaBase, adaptadorPostgres } from "./base";
export * as slug from "./slug";
