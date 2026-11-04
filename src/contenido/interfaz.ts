import type { Idioma } from "@/lib/idiomas";

// los textos fijos de la web: el menú, el pie y las piezas que se repiten en todas las páginas. El contenido de
// cada página vive con su página. EN y ES son un primer borrador: pasan por una persona nativa antes de
// publicarse. El inglés es británico (programme, gynaecologist); el español, neutro y de «tú», como el «tu»
// del francés
const fr = {
  meta: {
    titulo: "Yoga prénatal et cours de yoga à Genève | Sofia Yoga",
    descripcion:
      "Yoga prénatal, post-partum et cours de yoga dynamique à Genève avec Sofia Costa. En groupe, en privé ou au parc.",
  },
  nav: {
    principal: "Navigation principale",
    marca: "Sofia Yoga, accueil",
    inicio: "Accueil",
    abrirMenu: "Ouvrir le menu",
    cerrarMenu: "Fermer le menu",
    menu: "Menu",
    saltar: "Aller au contenu",
    migas: "Fil d’Ariane",
    whatsappFlotante: "Écrire à Sofia sur WhatsApp",
  },
  pie: {
    navegacion: "Navigation du pied de page",
    descripcion: "Yoga prénatal, post-partum et cours de yoga dynamique à Genève, en groupe, en privé ou au parc.",
    lema: "Ateliers et cours de yoga pour toutes et tous.",
    // sus formaciones, confirmadas el 30/9. Yoga Alliance es un registro (no certifica), por eso «enregistrée»
    formaciones: ["Enregistrée auprès de Yoga Alliance", "Ashtanga Vinyasa, en Inde", "Yin yoga et fascias, en Suisse", "Yoga pré et postnatal"],
    privados: "Cours privés",
    derechos: "© 2026 Sofia Yoga, Genève",
    prueba: "Version de test : les textes et les infos pratiques sont à confirmer.",
    legales: ["Mentions légales", "Confidentialité"],
  },
  aConfirmer: "à confirmer",
  infosPratiques: "Infos pratiques",
  preguntasFrecuentes: "Questions fréquentes",
  // debajo de las preguntas, con el enlace a contacto
  sinRespuesta: "Tu ne trouves pas ta réponse\u00a0?",
  escribime: "Écris-moi",
  enEstaPagina: "Sur cette page",
  fuentes: "Sources",
  // delante de la fuente corta de un dato, en las páginas de salud
  fuente: "Source\u00a0:",
  // el recordatorio de siempre en las páginas de embarazo y posparto
  avisoSalud:
    "Ces informations sont générales. Elles ne remplacent pas l’avis de ta sage-femme, de ta gynécologue ou de ta physio, qui connaissent ta situation.",
  escribirWhatsApp: "Écrire sur WhatsApp",
  porMail: "ou par e-mail",
  preguntarWhatsApp: "Demander sur WhatsApp",
  bienvenida: "Bienvenue",
};

type Interfaz = typeof fr;

const en: Interfaz = {
  meta: {
    titulo: "Prenatal yoga and yoga classes in Geneva | Sofia Yoga",
    descripcion:
      "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva with Sofia Costa. In a group, one-to-one or in the park.",
  },
  nav: {
    principal: "Main navigation",
    marca: "Sofia Yoga, home",
    inicio: "Home",
    abrirMenu: "Open the menu",
    cerrarMenu: "Close the menu",
    menu: "Menu",
    saltar: "Skip to content",
    migas: "Breadcrumb",
    whatsappFlotante: "Message Sofia on WhatsApp",
  },
  pie: {
    navegacion: "Footer navigation",
    descripcion: "Prenatal yoga, postnatal yoga and dynamic yoga classes in Geneva, in a group, one-to-one or in the park.",
    lema: "Yoga workshops and classes for everyone.",
    formaciones: ["Registered with Yoga Alliance", "Ashtanga Vinyasa, in India", "Yin yoga and fascia, in Switzerland", "Prenatal and postnatal yoga"],
    privados: "Private classes",
    derechos: "© 2026 Sofia Yoga, Geneva",
    prueba: "Test version: the texts and practical details are still to be confirmed.",
    legales: ["Legal notice", "Privacy"],
  },
  aConfirmer: "to be confirmed",
  infosPratiques: "Practical info",
  preguntasFrecuentes: "Frequently asked questions",
  sinRespuesta: "Can’t find your answer?",
  escribime: "Write to me",
  enEstaPagina: "On this page",
  fuentes: "Sources",
  fuente: "Source:",
  avisoSalud:
    "This is general information. It doesn’t replace the advice of your midwife, gynaecologist or physio, who know your situation.",
  escribirWhatsApp: "Message me on WhatsApp",
  porMail: "or by email",
  preguntarWhatsApp: "Ask on WhatsApp",
  bienvenida: "Welcome",
};

const es: Interfaz = {
  meta: {
    titulo: "Yoga prenatal y clases de yoga en Ginebra | Sofia Yoga",
    descripcion: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra con Sofia Costa. En grupo, en privado o en el parque.",
  },
  nav: {
    principal: "Navegación principal",
    marca: "Sofia Yoga, inicio",
    inicio: "Inicio",
    abrirMenu: "Abrir el menú",
    cerrarMenu: "Cerrar el menú",
    menu: "Menú",
    saltar: "Ir al contenido",
    migas: "Ruta de navegación",
    whatsappFlotante: "Escribirle a Sofia por WhatsApp",
  },
  pie: {
    navegacion: "Navegación del pie de página",
    descripcion: "Yoga prenatal, posparto y clases de yoga dinámico en Ginebra, en grupo, en privado o en el parque.",
    lema: "Talleres y clases de yoga para todo el mundo.",
    formaciones: ["Registrada en Yoga Alliance", "Ashtanga Vinyasa, en la India", "Yin yoga y fascias, en Suiza", "Yoga prenatal y posnatal"],
    privados: "Clases privadas",
    derechos: "© 2026 Sofia Yoga, Ginebra",
    prueba: "Versión de prueba: los textos y la información práctica están por confirmar.",
    legales: ["Aviso legal", "Privacidad"],
  },
  aConfirmer: "por confirmar",
  infosPratiques: "Información práctica",
  preguntasFrecuentes: "Preguntas frecuentes",
  sinRespuesta: "¿No encuentras tu respuesta?",
  escribime: "Escríbeme",
  enEstaPagina: "En esta página",
  fuentes: "Fuentes",
  fuente: "Fuente:",
  avisoSalud:
    "Esta información es general. No reemplaza la opinión de tu matrona, tu ginecóloga o tu fisioterapeuta, que conocen tu situación.",
  escribirWhatsApp: "Escribir por WhatsApp",
  porMail: "o por e-mail",
  preguntarWhatsApp: "Preguntar por WhatsApp",
  bienvenida: "Bienvenida",
};

export const INTERFAZ: Record<Idioma, Interfaz> = { fr, en, es };
