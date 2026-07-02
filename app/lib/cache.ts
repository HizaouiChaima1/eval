import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const CACHE_TAGS = {
  tasks: 'tasks',
  task: (id: number) => `task-${id}`,
  users: 'users',
} as const

export const getCachedTasks = (userId: number) =>
  unstable_cache(
    async () => {
      return prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          completed: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
        },
      })
    },
    [`tasks-list-${userId}`],
    { revalidate: 60, tags: [CACHE_TAGS.tasks] }
  )()

export const getCachedTask = (id: number) =>
  unstable_cache(
    async () => {
      return prisma.task.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          completed: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
        },
      })
    },
    [`task-${id}`],
    { revalidate: 30, tags: [CACHE_TAGS.tasks, CACHE_TAGS.task(id)] }
  )()
