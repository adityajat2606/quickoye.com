import Link from 'next/link'
import { Bookmark, Sparkles, UserRound } from 'lucide-react'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { MarketingRegisterForm } from '@/components/marketing/marketing-register-form'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { SITE_CONFIG } from '@/lib/site-config'

const benefits = [
  {
    title: 'Public profile',
    body: 'Choose a display name and avatar path so visitors recognize you across bookmarks and community.',
    icon: UserRound,
  },
  {
    title: 'Saved links',
    body: 'Submit URLs with context and tags—your shelf stays organized without unrelated marketplace clutter.',
    icon: Bookmark,
  },
  {
    title: 'Same calm UI',
    body: 'Registration matches the homepage palette so onboarding feels like part of the product, not an afterthought.',
    icon: Sparkles,
  },
]

export function MarketingRegisterPage() {
  return (
    <MarketingPublicShell
      eyebrow="Account"
      title="Create your account"
      description={`Join ${SITE_CONFIG.name} to publish a profile, save bookmarks, and revisit resources with a session stored locally on this device.`}
      actions={<MarketingCtaRow primary={{ href: '/login', label: 'Sign in instead' }} secondary={{ href: '/', label: 'Back to home' }} />}
    >
      <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
        <div className="space-y-5">
          {benefits.map((item) => (
            <MarketingSurfaceCard key={item.title} className="p-5 sm:p-6">
              <item.icon className="h-5 w-5" style={{ color: marketingTheme.maroon }} />
              <h3 className="mt-3 text-lg font-semibold text-[#1f1418]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{item.body}</p>
            </MarketingSurfaceCard>
          ))}
          <div className="rounded-[12px] border border-dashed border-black/12 bg-[#faf8f5] p-5 text-sm text-black/60">
            <p className="font-medium text-[#1f1418]">Prefer email first?</p>
            <p className="mt-1">
              Reach{' '}
              <Link href="/contact" className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }}>
                Contact
              </Link>{' '}
              for team onboarding or education plans.
            </p>
          </div>
        </div>
        <MarketingRegisterForm />
      </div>
    </MarketingPublicShell>
  )
}
