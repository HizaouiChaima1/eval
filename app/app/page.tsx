import Link from 'next/link'
import { Suspense } from 'react'
import { getCachedTasks } from '@/lib/cache'
import { buildMetadata } from '@/lib/seo'
import { toggleTaskAction } from '@/app/actions/tasks'
import { getSessionUserId } from '@/app/actions/auth'

export const metadata = buildMetadata({
  title: 'Accueil',
  description: 'Liste de vos tâches — gérez votre productivité avec TaskFlow.',
  path: '/',
})

export const revalidate = 60

async function TaskList() {
  const userId = await getSessionUserId()

  if (!userId) {
    return (
      <p className="text-gray-600">
        Veuillez vous{' '}
        <Link href="/auth" className="text-blue-600 hover:underline">
          connecter
        </Link>{' '}
        pour voir vos tâches.
      </p>
    )
  }

  const tasks = await getCachedTasks(userId)

  if (tasks.length === 0) {
    return (
      <p className="text-gray-600">
        Aucune tâche pour le moment.{' '}
        <Link href="/tasks/new" className="text-blue-600 hover:underline">
          Créer une tâche
        </Link>
      </p>
    )
  }

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
      {tasks.map((task) => (
        <li key={task.id} className="flex items-center justify-between gap-4 p-4">
          <div className="flex-1">
            <Link
              href={`/tasks/${task.id}`}
              className={`font-medium hover:text-blue-600 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}
            >
              {task.title}
            </Link>
            {task.description && (
              <p className="mt-1 text-sm text-gray-500">{task.description}</p>
            )}
            <p className="mt-1 text-xs text-gray-400">
              Par {task.user.name} · {new Date(task.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <form action={toggleTaskAction.bind(null, task.id)}>
            <button
              type="submit"
              className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
            >
              {task.completed ? 'Rouvrir' : 'Terminer'}
            </button>
          </form>
        </li>
      ))}
    </ul>
  )
}

function TaskListSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 rounded-lg bg-gray-200" />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes tâches</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos tâches avec des server actions et un cache optimisé.
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Nouvelle tâche
        </Link>
      </div>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList />
      </Suspense>
    </div>
  )
}
