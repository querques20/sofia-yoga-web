import localFont from "next/font/local";

// las tipografías de la web, aparte porque las usan el layout y la página 404 global (que no pasa por el layout)

// D-DIN y D-DIN Condensed son las del dossier v2 (licencia SIL OFL, ver fonts/OFL-D-DIN.txt)
const ddin = localFont({
  src: [
    { path: "./fonts/D-DIN.woff2", weight: "400", style: "normal" },
    { path: "./fonts/D-DIN-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ddin",
  display: "swap",
});

const ddinCondensed = localFont({
  src: [
    { path: "./fonts/D-DINCondensed.woff2", weight: "400", style: "normal" },
    { path: "./fonts/D-DINCondensed-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ddin-cond",
  display: "swap",
});

// Caveat va en el repo y no por Google Fonts: así el build no depende de bajar nada (licencia en fonts/OFL-Caveat.txt).
// Es el recorte "latin" de Google, que ya trae lo que usa el francés (acentos, œ, comillas, rayas)
const caveat = localFont({
  src: [{ path: "./fonts/Caveat-Bold-latin.woff2", weight: "700", style: "normal" }],
  variable: "--font-caveat",
  display: "swap",
});

/** las variables de las tres tipografías, para el className de <html> */
export const FUENTES = `${ddin.variable} ${ddinCondensed.variable} ${caveat.variable}`;
