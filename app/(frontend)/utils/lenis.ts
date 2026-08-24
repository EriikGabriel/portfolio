import type Lenis from "lenis";

/**
 * Shared reference to the active Lenis instance (set by <SmoothScroll />).
 * Lets plain utils like `scrollToSection` route through the smooth scroller
 * without prop-drilling or context access.
 */
export const lenisRef: { current: Lenis | null } = { current: null };
