import Link from 'next/link'
import { MarketingCtaRow, MarketingPublicShell } from '@/components/marketing/marketing-public-shell'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const highlights = [
  { label: 'Curators active', value: '12k+' },
  { label: 'Bookmarks surfaced', value: '180k' },
  { label: 'Profiles published', value: '8.6k' },
]

const pillars = [
  {
    title: 'Profiles with intent',
    description:
      'Public bios, avatars, and bookmark counts tell a story at a glance—so visitors know who you are before they dive into your shelves.',
  },
  {
    title: 'Bookmarks with context',
    description:
      'Every link carries a title, summary, and tags so future-you (and your followers) understand why it mattered in the first place.',
  },
  {
    title: 'Community without noise',
    description:
      'We optimize for calm discovery: fewer boxes, clearer hierarchy, and surfaces that reward curation over volume.',
  },
]

export default function AboutPage() {
  return (
    <MarketingPublicShell
      eyebrow="Company"
      title={`Why ${SITE_CONFIG.name} exists`}
      description="We built a dedicated home for profiles and social bookmarking—so your identity and your library stay in sync, without unrelated marketplace clutter."
      actions={
        <MarketingCtaRow primary={{ href: '/profile', label: 'Meet profiles' }} secondary={{ href: '/sbm', label: 'Browse bookmarks' }} />
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <MarketingSurfaceCard>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45">Our story</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#1f1418]">Calm software for people who live in links.</h2>
          <p className="mt-4 text-sm leading-relaxed text-black/60">
            Teams and solo curators both need a place to present who they are and what they read. {SITE_CONFIG.name} keeps those two truths
            together—profiles on the left, collections on the right, and a visual language borrowed from editorial desks instead of ad-heavy
            directories.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-[10px] border border-black/8 bg-[#faf8f5] p-4">
                <div className="text-2xl font-semibold" style={{ color: marketingTheme.maroon }}>
                  {item.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-black/50">{item.label}</div>
              </div>
            ))}
          </div>
        </MarketingSurfaceCard>

        <div className="space-y-4">
          {pillars.map((pillar) => (
            <MarketingSurfaceCard key={pillar.title} className="p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-[#1f1418]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">{pillar.description}</p>
            </MarketingSurfaceCard>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/8 pt-10">
        <div>
          <h2 className="text-2xl font-semibold text-[#1f1418]">People behind the product</h2>
          <p className="mt-2 max-w-xl text-sm text-black/60">A small crew obsessed with typography, trust cues, and the feeling of closing a great tab session.</p>
        </div>
        <Link href="/team" className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: marketingTheme.maroon }}>
          Full team →
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {mockTeamMembers.map((member) => (
          <MarketingSurfaceCard key={member.id} className="p-5 transition-transform hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border border-black/8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-[#1f1418]">{member.name}</p>
                <p className="text-xs text-black/50">{member.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-black/60">{member.bio}</p>
            <p className="mt-3 text-xs text-black/45">{member.location}</p>
          </MarketingSurfaceCard>
        ))}
      </div>
    </MarketingPublicShell>
  )
}
