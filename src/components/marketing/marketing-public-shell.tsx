import type { ReactNode } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { marketingTheme, marketingHeroClassName, marketingHeroStyle } from '@/components/marketing/marketing-theme'
import { cn } from '@/lib/utils'

type MarketingPublicShellProps = {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
  /** Narrow column for legal text */
  contentWidth?: 'default' | 'narrow'
}

export function MarketingPublicShell({
  eyebrow,
  title,
  description,
  actions,
  children,
  contentWidth = 'default',
}: MarketingPublicShellProps) {
  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: marketingTheme.cream, color: marketingTheme.ink }}>
      <NavbarShell />
      <header className={cn(marketingHeroClassName(), 'relative border-b border-white/10')} style={marketingHeroStyle()}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
          <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full opacity-80 blur-3xl" style={{ backgroundColor: marketingTheme.accent }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</p>
              ) : null}
              <h1 className="mt-3 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl">{title}</h1>
              {description ? <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-shrink-0 flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </header>

      <main
        className={cn(
          'mx-auto px-4 py-12 sm:px-6 lg:px-8',
          contentWidth === 'narrow' ? 'max-w-3xl' : 'max-w-6xl',
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  )
}

export function MarketingCtaRow({ primary, secondary }: { primary: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={primary.href}
        className="inline-flex h-11 items-center justify-center rounded-[10px] px-6 text-sm font-semibold text-white shadow-md shadow-black/20 transition hover:opacity-95"
        style={{ backgroundColor: marketingTheme.accent }}
      >
        {primary.label}
      </Link>
      {secondary ? (
        <Link
          href={secondary.href}
          className="inline-flex h-11 items-center justify-center rounded-[10px] border border-white/35 bg-transparent px-6 text-sm font-semibold text-white hover:bg-white/10"
        >
          {secondary.label}
        </Link>
      ) : null}
    </div>
  )
}
