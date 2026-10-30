import { COOKIE_IDIOMA, type Idioma } from "./idiomas";

/** guarda el idioma que eligió la persona por un año (ver COOKIE_IDIOMA) */
export function guardarIdioma(idioma: Idioma) {
  document.cookie = `${COOKIE_IDIOMA}=${idioma}; path=/; max-age=31536000; samesite=lax`;
}

/** el idioma que eligió antes, si eligió alguno */
export function idiomaGuardado() {
  return document.cookie.match(new RegExp(`(?:^|; )${COOKIE_IDIOMA}=([a-z]+)`))?.[1];
}
