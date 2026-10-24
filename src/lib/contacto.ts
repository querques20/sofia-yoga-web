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

// lo que dice ese mensaje según desde dónde se escribe (en francés, como toda la web; el espacio antes del
// signo es fijo, así no queda solo en otra línea). Los «…» son para que la persona complete el dato que
// Sofía necesita para responder: de cuántas semanas está o hace cuánto que dio a luz
export const MENSAJES = {
  prenatal: "Bonjour Sofia ! Je suis enceinte de … semaines et j’aimerais en savoir plus sur le yoga prénatal.",
  programme: "Bonjour Sofia ! J’aimerais être prévenue du lancement de Grossesse en mouvement.",
  postPartum: "Bonjour Sofia ! J’ai accouché il y a … semaines et j’aimerais en savoir plus sur le yoga post-partum.",
  cours: "Bonjour Sofia ! J’aimerais en savoir plus sur tes cours de yoga à Genève.",
  ouQuand: "Bonjour Sofia ! Où et quand ont lieu tes prochains cours ?",
  prive: "Bonjour Sofia ! J’aimerais en savoir plus sur les cours privés.",
  atelier: "Bonjour Sofia ! J’aimerais être prévenu.e du prochain atelier.",
  autre: "Bonjour Sofia !",
} as const;

export type Tema = keyof typeof MENSAJES;
