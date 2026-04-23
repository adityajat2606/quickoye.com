'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Bookmark,
  ChevronDown,
  Link2,
  MessageCircle,
  Share2,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { requestMarketingAuthOpen } from '@/overrides/marketing-auth-events'
import { cn } from '@/lib/utils'

const cream = '#F9F7F2'
const maroon = '#4A0E1C'
const accent = '#E8486A'

function NavPill({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90',
        className,
      )}
    >
      {label}
      <ChevronDown className="h-3 w-3 opacity-70" aria-hidden />
    </span>
  )
}

export function HomeLanding() {
  const openAuth = useCallback(() => requestMarketingAuthOpen(), [])

  return (
    <main className="font-sans">
      <section
        className="relative overflow-hidden pb-28 pt-6 text-white md:pb-36"
        style={{ background: `linear-gradient(165deg, ${maroon} 0%, #2f0810 55%, #1a0408 100%)` }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#E8486A] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <NavPill label="Product tour" />
              <NavPill label="Collections" className="hidden sm:inline-flex" />
            </div>
            <h1 className="mt-8 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Experience smarter profiles, saved links, and a calmer way to stay organized.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {SITE_CONFIG.name} is built for public profiles and social bookmarking—curate what matters, share collections, and
              revisit resources without noisy feeds.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                type="button"
                size="lg"
                className="h-12 rounded-[10px] border-0 px-8 text-sm font-semibold text-white shadow-lg shadow-black/20"
                style={{ backgroundColor: accent }}
                onClick={openAuth}
              >
                Get started
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="h-12 rounded-[10px] border-white/40 bg-transparent px-8 text-sm font-semibold text-white hover:bg-white/10"
                asChild
              >
                <Link href="/sbm">Browse bookmarks</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div
              className="relative z-10 rounded-[12px] border border-white/12 bg-white p-4 shadow-[0_28px_80px_rgba(0,0,0,0.35)] sm:p-6"
              style={{ color: '#1f1418' }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">Bookmark feed</p>
                  <p className="text-lg font-semibold">Saved for you</p>
                </div>
                <Button asChild size="sm" className="rounded-[8px]" style={{ backgroundColor: maroon }} variant="default">
                  <Link href="/sbm/submit">Add link</Link>
                </Button>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {[
                  { title: 'Design systems reading list', host: 'patterns.example', tag: 'Product' },
                  { title: 'Profile inspiration gallery', host: 'studio.example', tag: 'Profiles' },
                  { title: 'Bookmarking best practices', host: 'handbook.example', tag: 'Guides' },
                  { title: 'Community collections hub', host: 'collect.example', tag: 'Community' },
                ].map((row) => (
                  <div
                    key={row.title}
                    className="flex items-start gap-3 rounded-[10px] border border-black/6 bg-[#faf8f5] p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white shadow-inner">
                      <Bookmark className="h-5 w-5" style={{ color: maroon }} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{row.title}</p>
                      <p className="text-xs text-black/50">{row.host}</p>
                      <span className="mt-2 inline-flex rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black/55">
                        {row.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -right-4 top-8 z-20 hidden w-[220px] rounded-[12px] border border-white/20 bg-white/95 p-4 shadow-xl shadow-black/25 lg:block">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-black/8 bg-[#f3e9e4]">
                  <UserRound className="m-auto h-7 w-7 text-[#5b2b3b]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1f1418]">Jordan Lee</p>
                  <p className="text-xs text-black/55">Curator · 128 bookmarks</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2 text-[#4A0E1C]">
                <button type="button" className="rounded-[8px] border border-black/8 p-2 hover:bg-black/[0.03]" aria-label="Message">
                  <MessageCircle className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-[8px] border border-black/8 p-2 hover:bg-black/[0.03]" aria-label="Share profile">
                  <Share2 className="h-4 w-4" />
                </button>
                <button type="button" className="rounded-[8px] border border-black/8 p-2 hover:bg-black/[0.03]" aria-label="Copy link">
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="absolute -left-6 bottom-6 z-20 hidden w-[200px] rounded-[12px] border border-white/15 bg-[#1b0a0d]/90 p-4 text-white shadow-xl lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">Signals</p>
              <p className="mt-2 text-2xl font-semibold">48%</p>
              <p className="text-xs text-white/70">faster return visits after saving a collection.</p>
              <div className="mt-3 h-2 rounded-full bg-white/10">
                <div className="h-2 w-[48%] rounded-full" style={{ backgroundColor: accent }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 py-10" style={{ backgroundColor: cream }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-black/45">Trusted by teams who live in links</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-black/35">
            {['Northline', 'Brightstack', 'Parcel & Co', 'Helio Labs', 'Framehouse'].map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" style={{ backgroundColor: cream }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Empower your presence</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Profiles and bookmarks, designed as one calm system.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/60">
              Present who you are, save what you learn, and give others a clean surface to follow your collections—without unrelated
              marketplace clutter.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-[10px] px-6 text-sm font-semibold text-white" style={{ backgroundColor: maroon }}>
                <Link href="/profile">
                  Explore profiles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-[10px] border-[#4A0E1C]/25 px-6 text-sm font-semibold text-[#4A0E1C]">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
            <ul className="mt-10 space-y-4 text-sm text-black/65">
              {[
                'Public profile cards with avatar, bio, and bookmark counts',
                'Collections with tags, domains, and quick revisit flows',
                'Shareable shelves that read well on desktop and mobile',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: maroon }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto flex h-[320px] w-full max-w-md items-center justify-center">
            <div className="absolute inset-6 rounded-full border border-[#4A0E1C]/15" />
            <div className="absolute inset-12 rounded-full border border-[#4A0E1C]/12" />
            <div className="absolute inset-[4.5rem] rounded-full border border-[#4A0E1C]/10" />
            <div className="absolute left-4 top-6 text-xs font-semibold text-black/45">01 Create</div>
            <div className="absolute right-6 top-16 text-xs font-semibold text-black/45">02 Customize</div>
            <div className="absolute bottom-10 left-10 text-xs font-semibold text-black/45">03 Build</div>
            <div className="absolute bottom-16 right-6 text-xs font-semibold text-black/45">04 Connect</div>
            <div
              className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full text-3xl font-semibold text-white shadow-xl"
              style={{ backgroundColor: maroon }}
            >
              {SITE_CONFIG.name.charAt(0)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          {[
            {
              step: '01',
              total: '03',
              title: 'Create your profile',
              body: 'Tell your story with a focused public profile—avatar, bio, and the topics you curate most.',
              href: '/profile',
              image: '/placeholder.svg?height=640&width=960',
            },
            {
              step: '02',
              total: '03',
              title: 'Save your bookmarks',
              body: 'Capture links with context, tags, and collections so every revisit feels intentional.',
              href: '/sbm',
              image: '/placeholder.svg?height=640&width=960',
            },
            {
              step: '03',
              total: '03',
              title: 'Connect with others',
              body: 'Share shelves, discover curators, and grow a following around the resources you trust.',
              href: '/community',
              image: '/placeholder.svg?height=640&width=960',
            },
          ].map((block) => (
            <div key={block.step} className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-7xl font-semibold leading-none text-black/[0.07] sm:text-8xl">{block.step}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
                  {block.step} /{block.total}
                </p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">{block.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-black/60">{block.body}</p>
                <Link href={block.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: maroon }}>
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="relative overflow-hidden rounded-[12px] border border-black/8 bg-[#f4f1ec] shadow-[0_20px_60px_rgba(40,20,24,0.08)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={block.image}
                    alt={`${block.title} preview`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-[10px] border border-white/40 bg-white/90 p-4 shadow-lg backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">Live surface</p>
                  <p className="text-sm font-semibold text-[#1f1418]">
                    {block.step === '01'
                      ? 'Profile preview'
                      : block.step === '02'
                        ? 'Collection shelf'
                        : 'Community spotlight'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-black/5 py-16" style={{ backgroundColor: cream }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h3 className="text-3xl font-semibold tracking-[-0.03em]">Ready to publish your profile?</h3>
          <p className="max-w-2xl text-sm leading-7 text-black/60">
            Sign in to sync your identity locally, save bookmarks, and keep your collections within reach.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              className="rounded-[10px] px-8 text-sm font-semibold text-white"
              style={{ backgroundColor: accent }}
              onClick={openAuth}
            >
              Open account
            </Button>
            <Button asChild variant="outline" className="rounded-[10px] border-[#4A0E1C]/25 px-8 text-sm font-semibold text-[#4A0E1C]">
              <Link href="/register">Create profile</Link>
            </Button>
          </div>
        </div>
      </section>

    </main>
  )
}
