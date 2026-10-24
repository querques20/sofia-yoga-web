import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
};

// las salidas más útiles cuando un link está roto o es viejo
const SALIDAS = [
  { href: "/", texto: "Accueil" },
  { href: "/yoga-prenatal-geneve", texto: "Yoga prénatal" },
  { href: "/cours-de-yoga-geneve", texto: "Cours de yoga" },
  { href: "/contact", texto: "Contact" },
];

export default function PaginaNoEncontrada() {
  return (
    <main className="contenedor flex min-h-[86svh] flex-col justify-center pt-32 pb-20">
      <p className="mano text-[clamp(3rem,8vw,5rem)]">Oups</p>
      <h1 className="titre mt-3 text-[clamp(3rem,8.6vw,6.3rem)]">Cette page n’existe pas</h1>
      <p className="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed">
        Le lien est peut-être ancien ou mal écrit. Tu peux reprendre par ici&nbsp;:
      </p>
      <ul className="mt-8 flex flex-wrap gap-3">
        {SALIDAS.map((salida) => (
          <li key={salida.href}>
            <Link
              href={salida.href}
              className="inline-flex rounded-full border border-verde/25 px-5 py-2.5 text-[1.02rem] font-bold transition-colors duration-300 hover:bg-salvia-clara"
            >
              {salida.texto}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
