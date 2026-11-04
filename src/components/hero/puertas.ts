// las seis puertas del Inicio: qué foto lleva cada una, a dónde va y dónde queda en compu. Los nombres y los alt
// están en los textos de la página, por idioma; esto es estructura, igual para los tres

export type ClavePuerta = "prenatal" | "postPartum" | "groupe" | "prives" | "parc" | "ateliers";

export type Puerta = {
  clave: ClavePuerta;
  /** la página a la que lleva (la ruta en francés, que se traduce con rutaEn) y, si hace falta, el ancla */
  ruta: string;
  ancla?: string;
  archivo: string;
  /** foto libre de Unsplash hasta que llegue la de Sofía (ver «Las fotos del Inicio» en el README) */
  provisoria: boolean;
  /** dónde queda en compu: el centro en % del hero, el ancho en `--u`, y la proporción */
  cx: number;
  cy: number;
  w: number;
  ar: number;
  /** de qué pétalo de la flor sale (grados, 0 arriba, horario) y con qué giro queda al final */
  angulo: number;
  giro: number;
  /** el lugar en la apertura (0 abre primero) y cuánto se adelanta al bajar */
  orden: number;
  prof: number;
  /** qué parte de la foto se ve (object-position) y cuánto se acerca */
  pos: string;
  zoom?: number;
};

// cada foto sale del pétalo que le queda más cerca de su lugar, así se abren sin cruzarse
export const PUERTAS: Puerta[] = [
  {
    clave: "prenatal",
    ruta: "/yoga-prenatal-geneve",
    archivo: "/inicio/yoga-prenatal-geneve.jpg",
    provisoria: true,
    cx: 14,
    cy: 47,
    w: 21,
    ar: 0.79,
    angulo: 270,
    giro: -2.4,
    orden: 4,
    prof: 0.16,
    pos: "50% 50%",
  },
  {
    clave: "postPartum",
    ruta: "/yoga-post-partum-geneve",
    archivo: "/inicio/yoga-post-partum-geneve.jpg",
    provisoria: true,
    cx: 89,
    cy: 58,
    w: 18.5,
    ar: 0.8,
    angulo: 90,
    giro: 2.2,
    orden: 1,
    prof: 0.2,
    pos: "97% 50%",
  },
  {
    clave: "groupe",
    ruta: "/cours-de-yoga-geneve",
    archivo: "/inicio/cours-en-groupe-geneve.jpg",
    provisoria: true,
    cx: 24,
    cy: 77,
    w: 13.5,
    ar: 1,
    angulo: 210,
    giro: 1.6,
    orden: 3,
    prof: 0.3,
    pos: "100% 62%",
  },
  {
    clave: "prives",
    ruta: "/cours-prives-yoga-geneve",
    archivo: "/inicio/cours-prives-geneve.jpg",
    provisoria: false,
    cx: 84,
    cy: 20,
    w: 15,
    ar: 0.88,
    angulo: 30,
    giro: -1.8,
    orden: 0,
    prof: 0.1,
    pos: "50% 66%",
  },
  {
    clave: "parc",
    ruta: "/cours-de-yoga-geneve",
    ancla: "formats",
    archivo: "/inicio/yoga-au-parc-geneve.jpg",
    provisoria: false,
    cx: 76,
    cy: 78,
    w: 14.5,
    ar: 0.96,
    angulo: 150,
    giro: -2,
    orden: 2,
    prof: 0.26,
    pos: "48% 100%",
    zoom: 1.35,
  },
  {
    clave: "ateliers",
    ruta: "/ateliers-evenements",
    archivo: "/inicio/ateliers-yoga-geneve.jpg",
    provisoria: true,
    cx: 15,
    cy: 14,
    w: 14,
    ar: 1.2,
    angulo: 330,
    giro: 2,
    orden: 5,
    prof: 0.08,
    pos: "50% 50%",
  },
];
