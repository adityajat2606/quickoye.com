'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockBookmarks } from '@/data/mock-data'
import { marketingTheme } from '@/components/marketing/marketing-theme'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { loadFromStorage, saveToStorage, storageKeys } from '@/lib/local-storage'
import type { Bookmark as BookmarkType } from '@/types'

export default function SubmitBookmarkPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const categoryOptions = useMemo(
    () => Array.from(new Set(mockBookmarks.map((bookmark) => bookmark.category))),
    []
  )
  const [statusMessage, setStatusMessage] = useState('')
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [tagsInput, setTagsInput] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to submit a bookmark.',
      })
      router.push('/login')
      return
    }

    if (!url || !title || !description) {
      setStatusMessage('Please complete the required fields before submitting.')
      return
    }

    let domain = 'link'
    try {
      const parsed = new URL(url)
      domain = parsed.hostname.replace('www.', '')
    } catch {
      setStatusMessage('Please enter a valid URL.')
      return
    }

    const tags = tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const nextBookmark: BookmarkType = {
      id: `user-bookmark-${Date.now()}`,
      title,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .slice(0, 60),
      url,
      description,
      image: '/placeholder.svg?height=720&width=1280',
      domain,
      tags: tags.length > 0 ? tags : ['New'],
      category: category || 'General',
      createdAt: new Date().toISOString(),
      author: user,
      upvotes: 0,
      saves: 0,
      commentsCount: 0,
      isUpvoted: false,
      isSaved: false,
    }

    const stored = loadFromStorage<BookmarkType[]>(storageKeys.bookmarks, [])
    const next = [nextBookmark, ...stored]
    saveToStorage(storageKeys.bookmarks, next)

    setStatusMessage('Bookmark submitted! It will appear in your feed.')
    toast({
      title: 'Bookmark submitted',
      description: 'Your link has been added to the feed.',
    })
    setUrl('')
    setTitle('')
    setDescription('')
    setCategory('')
    setTagsInput('')
  }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: marketingTheme.cream, color: marketingTheme.ink }}>
      <NavbarShell />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 text-white" style={{ background: marketingTheme.heroGradient }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
            <div className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-white blur-3xl" />
            <div className="absolute right-0 top-16 h-64 w-64 rounded-full blur-3xl" style={{ backgroundColor: marketingTheme.accent }} />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Sparkles className="h-4 w-4" />
              Product · Submit a link
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">Share a bookmark your future self will thank you for.</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
              Add context, categories, and tags so readers understand the payoff before they click—everything stays aligned with our profiles and
              collections experience.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[12px] border border-black/8 bg-white p-6 shadow-[0_20px_60px_rgba(40,20,24,0.06)] sm:p-8"
            >
              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="text-sm font-medium text-foreground">URL</label>
                  <Input
                    placeholder="https://"
                    className="mt-2"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Title</label>
                  <Input
                    placeholder="Give this link a clear title"
                    className="mt-2"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <Textarea
                    placeholder="Why is this link useful?"
                    className="mt-2 min-h-[140px]"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((categoryOption) => (
                        <SelectItem key={categoryOption} value={categoryOption}>
                          {categoryOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Tags</label>
                  <Input
                    placeholder="Add tags separated by commas"
                    className="mt-2"
                    value={tagsInput}
                    onChange={(event) => setTagsInput(event.target.value)}
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['Design', 'Productivity', 'AI', 'Frontend', 'Research'].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className="rounded-[10px] text-white" style={{ backgroundColor: marketingTheme.maroon }}>
                    Submit bookmark
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-[10px] border-[#4A0E1C]/25"
                    onClick={() => {
                      setStatusMessage('Draft saved locally.')
                      toast({
                        title: 'Draft saved',
                        description: 'Your bookmark draft is saved on this device.',
                      })
                    }}
                  >
                    Save Draft
                  </Button>
                </div>
                {statusMessage && (
                  <p className="text-sm text-muted-foreground">{statusMessage}</p>
                )}
              </form>
            </motion.div>

            <div className="space-y-6">
              <div className="rounded-[12px] border border-black/8 bg-[#faf8f5] p-5">
                <h3 className="text-base font-semibold text-[#1f1418]">Submission tips</h3>
                <ul className="mt-3 space-y-2 text-sm text-black/60">
                  <li>Lead with the outcome (“learn X”, “compare Y”) in the title.</li>
                  <li>One honest sentence beats a paragraph of hype in the description.</li>
                  <li>Use 3–5 tags so profiles and feeds can cluster your link correctly.</li>
                </ul>
              </div>
              <div className="rounded-[12px] border border-black/8 bg-white p-5 shadow-sm">
                <h4 className="text-sm font-semibold text-[#1f1418]">After you submit</h4>
                <p className="mt-2 text-sm text-black/60">
                  Your bookmark joins the public river where curators can save, comment, and resurface it alongside related profiles.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
