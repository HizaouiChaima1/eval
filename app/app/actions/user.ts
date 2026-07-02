'use server'

import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations'
import { prisma } from '@/lib/prisma'
import type { ActionState } from '@/app/actions/auth'

export async function registerAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get('name'),
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

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  })

  if (existing) {
    return { success: false, message: 'Cet email est déjà utilisé' }
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 10)

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
    },
  })

  return { success: true, message: 'Inscription réussie' }
}
