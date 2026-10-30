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
    preguntas: "Questions fréquentes",
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
  contacto: {
    titulo: "Écris-moi",
    texto: "Pour une question sur les cours ou sur le programme, écris-moi par WhatsApp, par e-mail ou sur Instagram.",
    mail: "E-mail",
  },
  seguir: {
    titulo: "Pour aller plus loin",
    destinos: {
      prenatal: { titulo: "Yoga prénatal", texto: "Pendant la grossesse, avec l’accord de ta sage-femme ou de ta gynécologue." },
      postPartum: { titulo: "Yoga post-partum", texto: "Après l’accouchement et la rééducation du périnée, avec une intensité qui monte petit à petit." },
      cours: { titulo: "Cours de yoga", texto: "Vinyasa, yoga flow et yoga dynamique, en groupe, en privé ou au parc." },
      prives: { titulo: "Cours privés", texto: "Un cours rien que pour toi, à ton rythme." },
      ateliers: { titulo: "Ateliers", texto: "Les prochains ateliers et événements, annoncés ici." },
      aPropos: { titulo: "À propos", texto: "Mon parcours, mes formations et ma façon d’enseigner." },
    },
  },
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
    preguntas: "FAQ",
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
  contacto: {
    titulo: "Write to me",
    texto: "Got a question about the classes or the programme? Write to me on WhatsApp, by email or on Instagram.",
    mail: "Email",
  },
  seguir: {
    titulo: "Keep exploring",
    destinos: {
      prenatal: { titulo: "Prenatal yoga", texto: "During pregnancy, with the go-ahead from your midwife or gynaecologist." },
      postPartum: { titulo: "Postnatal yoga", texto: "After giving birth and pelvic floor rehab, with an intensity that builds up gradually." },
      cours: { titulo: "Yoga classes", texto: "Vinyasa, yoga flow and dynamic yoga, in a group, one-to-one or in the park." },
      prives: { titulo: "Private classes", texto: "A class just for you, at your own pace." },
      ateliers: { titulo: "Workshops", texto: "The next workshops and events, announced here." },
      aPropos: { titulo: "About", texto: "My story, my training and how I teach." },
    },
  },
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
    preguntas: "Preguntas frecuentes",
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
  contacto: {
    titulo: "Escríbeme",
    texto: "Si tienes una pregunta sobre las clases o el programa, escríbeme por WhatsApp, por e-mail o por Instagram.",
    mail: "E-mail",
  },
  seguir: {
    titulo: "Para seguir",
    destinos: {
      prenatal: { titulo: "Yoga prenatal", texto: "Durante el embarazo, con el visto bueno de tu matrona o tu ginecóloga." },
      postPartum: { titulo: "Yoga posparto", texto: "Después del parto y de la reeducación del suelo pélvico, con una intensidad que sube poco a poco." },
      cours: { titulo: "Clases de yoga", texto: "Vinyasa, yoga flow y yoga dinámico, en grupo, en privado o en el parque." },
      prives: { titulo: "Clases privadas", texto: "Una clase solo para ti, a tu ritmo." },
      ateliers: { titulo: "Talleres", texto: "Los próximos talleres y eventos, anunciados aquí." },
      aPropos: { titulo: "Sobre mí", texto: "Mi recorrido, mis formaciones y mi forma de enseñar." },
    },
  },
};

export const INTERFAZ: Record<Idioma, Interfaz> = { fr, en, es };
