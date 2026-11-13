// What a link's onClick may take over, and the URL it leaves behind. No imports: `pnpm test` runs it as it is

type Click = { defaultPrevented: boolean; button: number; metaKey: boolean; ctrlKey: boolean; shiftKey: boolean; altKey: boolean };

/** A left click with no modifier that nobody handled yet: the only kind a link's onClick may take over */
export function isPlainClick(e: Click): boolean {
  return !e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
}

/** The current URL without its hash: once back at the top, the hash would point at a section no longer in view */
export function urlWithoutHash(location: { pathname: string; search: string }): string {
  return `${location.pathname}${location.search}`;
}
