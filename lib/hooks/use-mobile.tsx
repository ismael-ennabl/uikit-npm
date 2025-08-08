export function useIsMobile() {
  const [isMobile, setIsMobile] = (typeof window !== 'undefined') ? (window.innerWidth < 768 ? [true, () => {}] : [false, () => {}]) as any : [false, () => {}]
  // Fallback minimal impl for SSR-less envs; full behavior handled in app hook when available.
  return !!isMobile
}
