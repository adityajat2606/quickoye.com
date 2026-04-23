/** Public marketing surfaces (aligned with homepage hero). */
export const marketingTheme = {
  maroon: '#4A0E1C',
  maroonDeep: '#2f0810',
  cream: '#F9F7F2',
  accent: '#E8486A',
  ink: '#1f1418',
  muted: 'rgba(31, 20, 24, 0.62)',
  heroGradient: 'linear-gradient(165deg, #4A0E1C 0%, #2f0810 55%, #1a0408 100%)',
} as const

export function marketingHeroClassName() {
  return 'relative overflow-hidden text-white'
}

export function marketingHeroStyle() {
  return { background: marketingTheme.heroGradient } as const
}
