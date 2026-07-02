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
      <div className="page-header">
        <h1 className="page-title">Ajouter une tâche</h1>
        <p className="page-subtitle">Décrivez ce que vous souhaitez accomplir.</p>
      </div>
      <TaskForm />
    </div>
  )
}
