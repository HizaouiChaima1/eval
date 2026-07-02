import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/app/actions/auth', () => ({
  logoutAction: vi.fn(),
}))

import { Header } from '@/components/Header'

describe('Header', () => {
  it('affiche les liens de connexion quand non authentifié', () => {
    render(<Header isAuthenticated={false} />)
    expect(screen.getByText('Connexion')).toBeInTheDocument()
    expect(screen.getByText('Inscription')).toBeInTheDocument()
    expect(screen.queryByText('Déconnexion')).not.toBeInTheDocument()
  })

  it('affiche les liens authentifiés quand connecté', () => {
    render(<Header isAuthenticated={true} />)
    expect(screen.getByText('Déconnexion')).toBeInTheDocument()
    expect(screen.getByText('Nouvelle tâche')).toBeInTheDocument()
    expect(screen.queryByText('Connexion')).not.toBeInTheDocument()
  })
})
