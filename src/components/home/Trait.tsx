/**
 * The line above a row of the Home: a faint track, and over it the line that draws from the left when the row
 * comes in (`[data-trait]`: the scene around it draws it)
 */
export function Trait() {
  return (
    <span className="absolute inset-x-0 top-0 block h-px bg-verde/20" aria-hidden="true">
      <span data-trait className="block h-[2px] rounded-full bg-verde" />
    </span>
  );
}
