'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { SITE_CONFIG } from '@/lib/site-config'

export function MarketingContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [body, setBody] = useState('')

  const submit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      const subject = encodeURIComponent(`${topic || 'Contact'} — ${name || 'Website visitor'}`)
      const text = encodeURIComponent(
        [`From: ${name}`, `Reply email: ${email}`, '', body].filter(Boolean).join('\n'),
      )
      window.location.href = `mailto:support@${SITE_CONFIG.domain}?subject=${subject}&body=${text}`
    },
    [body, email, name, topic],
  )

  return (
    <form className="mt-6 grid gap-4" onSubmit={submit}>
      <div className="grid gap-2">
        <label htmlFor="c-name" className="text-sm font-medium text-[#1f1418]">
          Name
        </label>
        <input
          id="c-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm text-[#1f1418] outline-none ring-[#4A0E1C]/20 focus:ring-[3px]"
          placeholder="Your name"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="c-email" className="text-sm font-medium text-[#1f1418]">
          Reply email
        </label>
        <input
          id="c-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm text-[#1f1418] outline-none ring-[#4A0E1C]/20 focus:ring-[3px]"
          placeholder="you@example.com"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="c-topic" className="text-sm font-medium text-[#1f1418]">
          Topic
        </label>
        <input
          id="c-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="h-11 rounded-[10px] border border-black/10 bg-white px-3 text-sm text-[#1f1418] outline-none ring-[#4A0E1C]/20 focus:ring-[3px]"
          placeholder="Profiles, bookmarks, partnerships…"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="c-body" className="text-sm font-medium text-[#1f1418]">
          Message
        </label>
        <textarea
          id="c-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-[160px] rounded-[10px] border border-black/10 bg-white px-3 py-3 text-sm text-[#1f1418] outline-none ring-[#4A0E1C]/20 focus:ring-[3px]"
          placeholder="What should we know? Include links or timelines if helpful."
        />
      </div>
      <Button type="submit" className="h-11 rounded-[10px] text-sm font-semibold text-white" style={{ backgroundColor: marketingTheme.maroon }}>
        Send via email
      </Button>
      <p className="text-xs text-black/50">Opens your default mail app with this message pre-filled. Nothing is stored on our servers from this form.</p>
    </form>
  )
}
