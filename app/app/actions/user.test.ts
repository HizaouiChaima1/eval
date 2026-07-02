import { describe, it, expect, vi, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
  unstable_cache: (fn: () => unknown) => fn,
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}))

import { prisma } from '@/lib/prisma'
import { registerAction } from '@/app/actions/user'

describe('registerAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retourne une erreur pour des données invalides', async () => {
    const formData = new FormData()
    formData.set('name', 'A')
    formData.set('email', 'invalid')
    formData.set('password', '123')

    const result = await registerAction({ success: false, message: '' }, formData)

    expect(result.success).toBe(false)
    expect(result.errors).toBeDefined()
  })

  it('retourne une erreur si l email existe déjà', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: 1,
      name: 'Existing',
      email: 'test@example.com',
      password: 'hash',
      createdAt: new Date(),
    })

    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'test@example.com')
    formData.set('password', 'password123')

    const result = await registerAction({ success: false, message: '' }, formData)

    expect(result.success).toBe(false)
    expect(result.message).toBe('Cet email est déjà utilisé')
  })

  it('crée un utilisateur avec mot de passe hashé', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null)
    vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never)
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: 2,
      name: 'Test User',
      email: 'new@example.com',
      password: 'hashed_password',
      createdAt: new Date(),
    })

    const formData = new FormData()
    formData.set('name', 'Test User')
    formData.set('email', 'new@example.com')
    formData.set('password', 'password123')

    const result = await registerAction({ success: false, message: '' }, formData)

    expect(result.success).toBe(true)
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10)
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'new@example.com',
        password: 'hashed_password',
      },
    })
  })
})
