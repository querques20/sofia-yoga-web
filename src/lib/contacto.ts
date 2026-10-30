import type { Idioma } from "./idiomas";

// datos de su tarjeta (contexto maestro, confirmados). Los lugares, horarios y precios todavía no los tenemos
export const CONTACTO = {
  whatsapp: "https://wa.me/41764458563",
  telefono: "076 445 85 63",
  instagram: "https://www.instagram.com/sofia.yogaflow/",
  instagramUsuario: "@sofia.yogaflow",
  email: "soficostav@gmail.com",
};

// el link de WhatsApp con el mensaje ya escrito: se abre su chat y la persona decide si lo manda
export function enlaceWhatsApp(mensaje?: string) {
  return mensaje ? `${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}` : CONTACTO.whatsapp;
}

// lo que dice ese mensaje según desde dónde se escribe, en el idioma de la página (en francés el espacio antes del
// signo es fijo, así no queda solo en otra línea). Los «…» son para que la persona complete el dato que
// Sofía necesita para responder: de cuántas semanas está o hace cuánto que dio a luz. «Grossesse en
// mouvement» es el nombre del programa: no se traduce
const fr = {
  prenatal: "Bonjour Sofia ! Je suis enceinte de … semaines et j’aimerais en savoir plus sur le yoga prénatal.",
  programme: "Bonjour Sofia ! J’aimerais être prévenue du lancement de Grossesse en mouvement.",
  postPartum: "Bonjour Sofia ! J’ai accouché il y a … semaines et j’aimerais en savoir plus sur le yoga post-partum.",
  cours: "Bonjour Sofia ! J’aimerais en savoir plus sur tes cours de yoga à Genève.",
  ouQuand: "Bonjour Sofia ! Où et quand ont lieu tes prochains cours ?",
  prive: "Bonjour Sofia ! J’aimerais en savoir plus sur les cours privés.",
  atelier: "Bonjour Sofia ! J’aimerais être prévenu.e du prochain atelier.",
  autre: "Bonjour Sofia !",
};

export type Tema = keyof typeof fr;

export const MENSAJES: Record<Idioma, Record<Tema, string>> = {
  fr,
  en: {
    prenatal: "Hi Sofia! I’m … weeks pregnant and I’d like to know more about prenatal yoga.",
    programme: "Hi Sofia! I’d like to hear when Grossesse en mouvement launches.",
    postPartum: "Hi Sofia! I gave birth … weeks ago and I’d like to know more about postnatal yoga.",
    cours: "Hi Sofia! I’d like to know more about your yoga classes in Geneva.",
    ouQuand: "Hi Sofia! Where and when are your next classes?",
    prive: "Hi Sofia! I’d like to know more about private classes.",
    atelier: "Hi Sofia! I’d like to hear about the next workshop.",
    autre: "Hi Sofia!",
  },
  es: {
    prenatal: "¡Hola, Sofia! Estoy embarazada de … semanas y me gustaría saber más sobre el yoga prenatal.",
    programme: "¡Hola, Sofia! Me gustaría enterarme cuando salga Grossesse en mouvement.",
    postPartum: "¡Hola, Sofia! Di a luz hace … semanas y me gustaría saber más sobre el yoga posparto.",
    cours: "¡Hola, Sofia! Me gustaría saber más sobre tus clases de yoga en Ginebra.",
    ouQuand: "¡Hola, Sofia! ¿Dónde y cuándo son tus próximas clases?",
    prive: "¡Hola, Sofia! Me gustaría saber más sobre las clases privadas.",
    atelier: "¡Hola, Sofia! Me gustaría enterarme del próximo taller.",
    autre: "¡Hola, Sofia!",
  },
};
