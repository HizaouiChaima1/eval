'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession, getSession } from '@/lib/auth'

export type ActionState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Données invalides',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })

  if (!user) {
    return { success: false, message: 'Email ou mot de passe incorrect' }
  }

  const valid = await bcrypt.compare(parsed.data.password, user.password)
  if (!valid) {
    return { success: false, message: 'Email ou mot de passe incorrect' }
  }

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
  })

  return { success: true, message: 'Connexion réussie' }
}

export async function logoutAction(): Promise<void> {
  await deleteSession()
  revalidatePath('/')
  redirect('/')
}

export async function getSessionUserId(): Promise<number | null> {
  const session = await getSession()
  return session?.id ?? null
}
