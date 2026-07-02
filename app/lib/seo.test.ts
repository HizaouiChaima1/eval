import { describe, it, expect, vi, beforeEach } from 'vitest'
import { buildMetadata, SITE_NAME } from '@/lib/seo'
describe('buildMetadata', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://evalproject-kappa.vercel.app/')
  })

  it('génère les métadonnées par défaut', () => {
    const metadata = buildMetadata()
    expect(metadata.title).toBe(SITE_NAME)
    expect(metadata.robots).toEqual({ index: true, follow: true })
  })

  it('génère un titre personnalisé', () => {
    const metadata = buildMetadata({ title: 'Connexion' })
    expect(metadata.title).toBe(`Connexion | ${SITE_NAME}`)
  })

  it('désactive l indexation quand noIndex est true', () => {
    const metadata = buildMetadata({ noIndex: true })
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })

  it('inclut une URL canonique', () => {
    const metadata = buildMetadata({ path: '/auth' })
    expect(metadata.alternates?.canonical).toBe('https://evalproject-kappa.vercel.app/auth')
  })
})
