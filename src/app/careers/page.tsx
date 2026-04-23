import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    title: 'Product Designer',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid',
    focus: 'Design bookmark cards, profile shells, and onboarding that feel editorial, not administrative.',
  },
  {
    title: 'Frontend Engineer',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Senior',
    focus: 'Ship accessible, performant surfaces for feeds, collections, and identity—mostly in React + Next.js.',
  },
  {
    title: 'Community Lead',
    location: 'Remote',
    type: 'Part-time',
    level: 'Mid',
    focus: 'Grow curator programs, host office hours, and translate feedback into crisp product narratives.',
  },
]

const benefits = [
  'Remote-first team with intentional overlap hours',
  'Health stipend and annual learning budget',
  'Quarterly in-person retreats for design and roadmap',
  'Stipend for books, courses, and museum passes (curiosity is part of the job)',
]

export default function CareersPage() {
  return (
    <MarketingPublicShell
      eyebrow="Company"
      title="Careers at the intersection of identity and curation"
      description={`Join ${SITE_CONFIG.name} as we craft the next generation of profile-led bookmarking—fewer feeds, more meaning.`}
      actions={<MarketingCtaRow primary={{ href: '/contact', label: 'Talk with us' }} secondary={{ href: '/about', label: 'Our story' }} />}
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          {roles.map((role) => (
            <MarketingSurfaceCard key={role.title} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-[6px] border-0 text-white" style={{ backgroundColor: marketingTheme.maroon }}>
                  {role.level}
                </Badge>
                <Badge variant="outline" className="rounded-[6px] border-black/15 text-[#1f1418]">
                  {role.type}
                </Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-[#1f1418]">{role.title}</h2>
              <p className="mt-1 text-sm text-black/50">{role.location}</p>
              <p className="mt-3 text-sm leading-relaxed text-black/60">{role.focus}</p>
              <Button variant="outline" className="mt-5 rounded-[10px] border-[#4A0E1C]/25" asChild>
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </MarketingSurfaceCard>
          ))}
        </div>

        <MarketingSurfaceCard className="h-fit lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Why join</p>
          <h3 className="mt-3 text-xl font-semibold text-[#1f1418]">We optimize for taste</h3>
          <p className="mt-3 text-sm leading-relaxed text-black/60">
            You will work on problems that reward restraint: how much metadata is enough, how profiles earn trust, and how collections stay
            legible after hundreds of saves.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-black/65">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded-[10px] border border-black/8 bg-[#faf8f5] px-3 py-3">
                {benefit}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full rounded-[10px] text-white" style={{ backgroundColor: marketingTheme.accent }} asChild>
            <Link href="/contact">Introduce yourself</Link>
          </Button>
        </MarketingSurfaceCard>
      </div>
    </MarketingPublicShell>
  )
}
