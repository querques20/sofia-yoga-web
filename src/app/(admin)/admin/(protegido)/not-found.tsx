import { BotonEnlace, Encabezado, PantallaDeLista } from "@sofia/kit-admin";

/**
 * La 404 del admin, con su armazón, al lado de «Sin permiso». Sin ella, una
 * URL mal escrita mostraba la pantalla gris de Next en inglés, sin sidebar.
 * Dice qué pasó y lleva al Inicio; sin primario, porque acá no hay nada que
 * hacer: lo que existe está en el menú.
 */
export default function NoEncontrada() {
  return (
    <PantallaDeLista>
      <Encabezado
        titulo="Esta dirección no está en el admin"
        detalle="El link puede estar mal escrito, o la sección cambió de lugar."
        acciones={
          <BotonEnlace variante="secundario" href="/admin">
            Ir al Inicio
          </BotonEnlace>
        }
      />
    </PantallaDeLista>
  );
}
