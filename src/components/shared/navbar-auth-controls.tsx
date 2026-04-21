'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-w-0 items-center gap-2">
      <div className="flex min-w-0 items-center gap-2" title={user?.email}>
        <Avatar className="h-9 w-9 shrink-0 border border-[rgba(110,26,55,0.12)]">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-[120px] truncate text-sm font-medium text-[#35131f] sm:inline md:max-w-[160px]">{user?.name}</span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 shrink-0 gap-1.5 rounded-full border-[rgba(110,26,55,0.22)] px-3 text-xs font-semibold text-[#5f4750] hover:bg-[rgba(110,26,55,0.08)] sm:px-4"
        onClick={() => logout()}
      >
        <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Sign out
      </Button>
    </div>
  )
}
