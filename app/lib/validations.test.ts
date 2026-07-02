import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  registerSchema,
  taskSchema,
  taskUpdateSchema,
} from '@/lib/validations'

describe('loginSchema', () => {
  it('accepte des identifiants valides', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'secret123',
    })
    expect(result.success).toBe(true)
  })

  it('rejette un email invalide', () => {
    const result = loginSchema.safeParse({
      email: 'invalid',
      password: 'secret123',
    })
    expect(result.success).toBe(false)
  })

  it('rejette un mot de passe trop court', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: '123',
    })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  it('accepte une inscription valide', () => {
    const result = registerSchema.safeParse({
      name: 'Jean Dupont',
      email: 'jean@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(true)
  })

  it('rejette un nom trop court', () => {
    const result = registerSchema.safeParse({
      name: 'J',
      email: 'jean@example.com',
      password: 'password123',
    })
    expect(result.success).toBe(false)
  })
})

describe('taskSchema', () => {
  it('accepte une tâche avec titre uniquement', () => {
    const result = taskSchema.safeParse({ title: 'Ma tâche' })
    expect(result.success).toBe(true)
  })

  it('rejette un titre vide', () => {
    const result = taskSchema.safeParse({ title: '' })
    expect(result.success).toBe(false)
  })
})

describe('taskUpdateSchema', () => {
  it('accepte une mise à jour avec statut completed', () => {
    const result = taskUpdateSchema.safeParse({
      title: 'Tâche mise à jour',
      completed: true,
    })
    expect(result.success).toBe(true)
  })
})
