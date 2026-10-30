"use client";

import { useInterfaz } from "@/lib/useInterfaz";

/** lo que todavía no sabemos: se ve claro que falta, sin esconderlo ni inventarlo */
export function AConfirmer() {
  return (
    <span className="inline-block rounded-full border border-dashed border-verde/45 px-2.5 py-px text-[0.92em] whitespace-nowrap">
      {useInterfaz().aConfirmer}
    </span>
  );
}
