import { CONTACTO, enlaceWhatsApp } from "@/lib/contacto";
import { interfaz } from "@/lib/idioma-actual";
import { Bienvenue } from "./Bienvenue";
import { Magnetique } from "./Magnetique";

/** el cierre de cada página: cómo escribirle. Desde cada página, el WhatsApp ya lleva el mensaje de ese tema */
export async function Contact({ mensaje }: { mensaje?: string }) {
  const t = await interfaz();
  return (
    <section id="contact" className="pt-[clamp(2rem,6vw,4rem)] pb-[clamp(4rem,10vw,7rem)]">
      <div className="contenedor grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 className="titre text-[clamp(3.6rem,12vw,9.5rem)]">{t.contacto.titulo}</h2>
          <p className="mt-6 max-w-[32rem] text-[1.15rem] leading-relaxed">
            {t.contacto.texto}
          </p>
          <div className="mt-9">
            <Magnetique>
              <a className="boton" href={enlaceWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer">
                {t.escribirWhatsApp}
              </a>
            </Magnetique>
          </div>
        </div>
        <ul className="space-y-5 text-[1.15rem] lg:col-span-5">
          <li>
            <span className="block text-[0.95rem] opacity-70">WhatsApp</span>
            <a className="enlace" href={CONTACTO.whatsapp} target="_blank" rel="noopener noreferrer">
              {CONTACTO.telefono}
            </a>
          </li>
          <li>
            <span className="block text-[0.95rem] opacity-70">{t.contacto.mail}</span>
            <a className="enlace" href={`mailto:${CONTACTO.email}`}>
              {CONTACTO.email}
            </a>
          </li>
          <li>
            <span className="block text-[0.95rem] opacity-70">Instagram</span>
            <a className="enlace" href={CONTACTO.instagram} target="_blank" rel="noopener noreferrer">
              {CONTACTO.instagramUsuario}
            </a>
          </li>
        </ul>
      </div>

      <Bienvenue className="contenedor mt-[clamp(4rem,10vw,7rem)]" />
    </section>
  );
}
