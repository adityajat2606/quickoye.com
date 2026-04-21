'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Bookmark, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { requestMarketingAuthOpen } from '@/overrides/marketing-auth-events'

const maroon = '#4A0E1C'

export function MarketingLoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Add your email and password to continue.', variant: 'destructive' })
      return
    }
    try {
      await login(email.trim(), password)
      toast({ title: 'Signed in', description: 'Saved locally on this device.' })
      router.push('/')
    } catch {
      toast({ title: 'Could not sign in', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1f1418]">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <section className="rounded-[12px] border border-black/8 bg-white p-8 shadow-[0_20px_60px_rgba(40,20,24,0.08)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] border border-black/8 bg-[#f7f1ea]" style={{ color: maroon }}>
              <Bookmark className="h-5 w-5" />
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Profiles & bookmarks</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em]">Sign in to {SITE_CONFIG.name}</h1>
            <p className="mt-4 text-sm leading-7 text-black/60">
              Access your public profile, saved collections, and submission tools. Sessions persist locally so returning feels instant.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-black/65">
              {['Curated feeds without unrelated marketplaces', 'Local session storage for quick return visits', 'Focused flows for profiles and links'].map((item) => (
                <li key={item} className="flex gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0" style={{ color: maroon }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[12px] border border-black/8 bg-white p-8 shadow-[0_20px_60px_rgba(40,20,24,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Welcome back</p>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-[10px]"
                  placeholder="you@example.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-[10px]"
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 rounded-[10px] text-sm font-semibold text-white"
                style={{ backgroundColor: maroon }}
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-black/60">
              <Link href="/forgot-password" className="font-semibold hover:underline">
                Forgot password?
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline" style={{ color: maroon }}>
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-6 w-full rounded-[10px] border-[#4A0E1C]/25 text-sm font-semibold text-[#4A0E1C]"
              style={{ borderColor: `${maroon}33` }}
              onClick={() => requestMarketingAuthOpen()}
            >
              Open the same sign-in window as the homepage
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
