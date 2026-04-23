export const MARKETING_AUTH_OPEN = 'quickoye:marketing-auth-open'

export function requestMarketingAuthOpen() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(MARKETING_AUTH_OPEN))
}
