import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { getSessionUserId } from '@/app/actions/auth'
import { getCachedTask } from '@/lib/cache'
import { buildMetadata } from '@/lib/seo'
import { TaskEditForm } from '@/components/TaskEditForm'

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const taskId = Number(id)

  if (Number.isNaN(taskId)) {
    return buildMetadata({ title: 'Tâche introuvable', noIndex: true })
  }

  const task = await getCachedTask(taskId)

  if (!task) {
    return buildMetadata({ title: 'Tâche introuvable', noIndex: true })
  }

  return buildMetadata({
    title: task.title,
    description: task.description ?? `Modifier la tâche : ${task.title}`,
    path: `/tasks/${task.id}`,
    noIndex: true,
  })
}

export default async function TaskDetailPage({ params }: PageProps) {
  const userId = await getSessionUserId()
  if (!userId) {
    redirect('/auth')
  }

  const { id } = await params
  const taskId = Number(id)

  if (Number.isNaN(taskId)) {
    notFound()
  }

  const task = await getCachedTask(taskId)

  if (!task || task.userId !== userId) {
    notFound()
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Modifier la tâche</h1>
      <TaskEditForm
        taskId={task.id}
        defaultValues={{
          title: task.title,
          description: task.description,
          completed: task.completed,
        }}
      />
    </div>
  )
}
