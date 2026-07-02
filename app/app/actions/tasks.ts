'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getSessionUserId } from '@/app/actions/auth'
import { prisma } from '@/lib/prisma'
import { taskSchema, taskUpdateSchema } from '@/lib/validations'
import type { ActionState } from '@/app/actions/auth'

function invalidateTaskCache(taskId?: number) {
  revalidatePath('/')
  revalidatePath('/tasks/new')
  if (taskId) {
    revalidatePath(`/tasks/${taskId}`)
  }
}

export async function createTaskAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const userId = await getSessionUserId()
  if (!userId) {
    return { success: false, message: 'Vous devez être connecté' }
  }

  const parsed = taskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Données invalides',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  const task = await prisma.task.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      userId,
    },
  })

  invalidateTaskCache()
  redirect(`/tasks/${task.id}`)
}

export async function updateTaskAction(
  taskId: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const userId = await getSessionUserId()
  if (!userId) {
    return { success: false, message: 'Vous devez être connecté' }
  }

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  })

  if (!task) {
    return { success: false, message: 'Tâche introuvable' }
  }

  const parsed = taskUpdateSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    completed: formData.get('completed') === 'on',
  })

  if (!parsed.success) {
    return {
      success: false,
      message: 'Données invalides',
      errors: parsed.error.flatten().fieldErrors,
    }
  }

  await prisma.task.update({
    where: { id: taskId },
    data: parsed.data,
  })

  invalidateTaskCache(taskId)
  return { success: true, message: 'Tâche mise à jour' }
}

export async function deleteTaskAction(taskId: number): Promise<void> {
  const userId = await getSessionUserId()
  if (!userId) return

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  })

  if (!task) return

  await prisma.task.delete({ where: { id: taskId } })
  invalidateTaskCache(taskId)
  redirect('/')
}

export async function toggleTaskAction(taskId: number): Promise<void> {
  const userId = await getSessionUserId()
  if (!userId) return

  const task = await prisma.task.findFirst({
    where: { id: taskId, userId },
  })

  if (!task) return

  await prisma.task.update({
    where: { id: taskId },
    data: { completed: !task.completed },
  })

  invalidateTaskCache(taskId)
}
