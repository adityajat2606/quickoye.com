'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/lib/auth-context'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { MarketingSurfaceCard } from '@/components/marketing/marketing-surface-card'

export function MarketingRegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Add your name, email, and password to continue.', variant: 'destructive' })
      return
    }
    try {
      await signup(name.trim(), email.trim(), password)
      toast({ title: 'Welcome aboard', description: 'You are signed in and saved on this device.' })
      router.push('/')
    } catch {
      toast({ title: 'Could not create account', description: 'Please try again.', variant: 'destructive' })
    }
  }

  return (
    <MarketingSurfaceCard className="p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Your details</p>
      <h2 className="mt-2 text-xl font-semibold text-[#1f1418]">Set up login</h2>
      <p className="mt-2 text-sm text-black/55">We keep a lightweight session on this device so you can publish a profile and save bookmarks right away.</p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="register-name">Display name</Label>
          <Input
            id="register-name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-[10px]"
            placeholder="How you want to appear on your profile"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-[10px]"
            placeholder="you@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-[10px]"
            placeholder="At least 8 characters"
          />
        </div>
        <p className="text-xs leading-relaxed text-black/50">
          By continuing you agree to our{' '}
          <Link href="/terms" className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }}>
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="font-semibold underline-offset-2 hover:underline" style={{ color: marketingTheme.maroon }}>
            Privacy
          </Link>
          .
        </p>
        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 rounded-[10px] text-sm font-semibold text-white"
          style={{ backgroundColor: marketingTheme.maroon }}
        >
          {isLoading ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
      <div className="mt-6 border-t border-black/8 pt-6 text-center text-sm text-black/60">
        Already registered?{' '}
        <Link href="/login" className="font-semibold hover:underline" style={{ color: marketingTheme.maroon }}>
          Sign in
        </Link>
      </div>
    </MarketingSurfaceCard>
  )
}
