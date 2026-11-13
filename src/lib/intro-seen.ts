// The intro's "seen" mark, kept in sessionStorage: the language it was seen in and when. The intro plays once
// per visit and language, and again once the mark is older than its time to live. Two readers share this:
// Entrada (decides whether to play) and the pre-paint script of MarcasDelDocumento (hides the curtain)

export const INTRO_KEY = "sofia-entrada";

/** How long a seen intro stays seen. After it, the next page load in the same tab plays the intro again */
export const INTRO_TTL_MS = 30 * 60 * 1000;

export function introMark(lang: string, now: number): string {
  return `${lang}|${now}`;
}

/**
 * Whether the intro counts as seen. Keep it self-contained and in plain syntax: MarcasDelDocumento inlines its
 * source (`toString()`) into the pre-paint script, where no import or compiler helper exists
 */
export function introSeen(mark: string | null, lang: string, now: number, ttl: number): boolean {
  if (!mark) return false;
  const cut = mark.indexOf("|");
  if (cut < 0) return false;
  const age = now - parseInt(mark.slice(cut + 1), 10);
  return mark.slice(0, cut) === lang && age >= 0 && age < ttl;
}
