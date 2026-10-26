/**
 * El JSON-LD de una página, como recomienda la guía de Next: un <script> en la página. El `<` se escapa
 * para que ningún texto pueda cerrar el script
 */
export function DatosEstructurados({ datos }: { datos: object[] }) {
  const json = { "@context": "https://schema.org", "@graph": datos };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }} />;
}
