import { redirect } from 'next/navigation'
import { getSessionUserId } from '@/app/actions/auth'
import { TaskForm } from '@/components/TaskForm'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Nouvelle tâche',
  description: 'Ajoutez une nouvelle tâche à votre liste.',
  path: '/tasks/new',
  noIndex: true,
})

export default async function NewTaskPage() {
  const userId = await getSessionUserId()
  if (!userId) {
    redirect('/auth')
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Ajouter une tâche</h1>
      <TaskForm />
    </div>
  )
}
