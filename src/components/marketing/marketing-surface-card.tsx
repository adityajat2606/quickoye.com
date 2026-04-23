import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function MarketingSurfaceCard({
  className,
  children,
  id,
}: {
  className?: string
  children: ReactNode
  id?: string
}) {
  return (
    <div
      id={id}
      className={cn(
        'rounded-[12px] border border-black/[0.08] bg-white p-6 shadow-[0_20px_60px_rgba(40,20,24,0.06)] sm:p-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
