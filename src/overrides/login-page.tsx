import { MarketingLoginPage } from '@/overrides/marketing-login-page'

export const LOGIN_PAGE_OVERRIDE_ENABLED = true

export function LoginPageOverride() {
  return <MarketingLoginPage />
}
