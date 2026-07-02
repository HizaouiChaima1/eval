import Link from 'next/link'
import { Suspense } from 'react'
import { getSessionUserId } from '@/app/actions/auth'
import { getCachedTasks } from '@/lib/cache'
import { buildMetadata } from '@/lib/seo'
import { toggleTaskAction } from '@/app/actions/tasks'

export const metadata = buildMetadata({
  title: 'Accueil',
  description: 'Liste de vos tâches — gérez votre productivité avec TaskFlow.',
  path: '/',
})

export const revalidate = 60

async function TaskList({ userId }: { userId: number | null }) {
  if (!userId) {
    return (
      <div className="card flex flex-col items-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
          ✓
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Bienvenue sur TaskFlow</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Connectez-vous pour gérer vos tâches et suivre votre productivité.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/auth" className="btn-primary">
            Se connecter
          </Link>
          <Link href="/inscri" className="btn-secondary">
            S&apos;inscrire
          </Link>
        </div>
      </div>
    )
  }

  const tasks = await getCachedTasks(userId)
  const completedCount = tasks.filter((t) => t.completed).length
  const pendingCount = tasks.length - completedCount

  if (tasks.length === 0) {
    return (
      <div className="card flex flex-col items-center px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">
          ✓
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Aucune tâche pour le moment</h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">
          Commencez par créer votre première tâche et organisez votre journée.
        </p>
        <Link href="/tasks/new" className="btn-primary mt-6">
          Créer une tâche
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
          <p className="text-xs font-medium text-slate-500">Total</p>
        </div>
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs font-medium text-slate-500">En cours</p>
        </div>
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-bold text-emerald-600">{completedCount}</p>
          <p className="text-xs font-medium text-slate-500">Terminées</p>
        </div>
      </div>

      <ul className="card divide-y divide-slate-100 overflow-hidden">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-slate-50/80 sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 sm:mt-0 ${
                  task.completed
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-slate-300 bg-white'
                }`}
                aria-hidden
              >
                {task.completed && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/tasks/${task.id}`}
                    className={`font-medium transition-colors hover:text-brand-600 ${
                      task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </Link>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      task.completed
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {task.completed ? 'Terminée' : 'En cours'}
                  </span>
                </div>
                {task.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{task.description}</p>
                )}
                <p className="mt-1.5 text-xs text-slate-400">
                  Par {task.user.name} · {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            <form action={toggleTaskAction.bind(null, task.id)} className="shrink-0">
              <button
                type="submit"
                className={task.completed ? 'btn-secondary !py-1.5 !text-xs' : 'btn-success'}
              >
                {task.completed ? 'Rouvrir' : 'Terminer'}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card h-16 animate-pulse bg-slate-100" />
        ))}
      </div>
      <div className="card divide-y divide-slate-100">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 p-4">
            <div className="h-5 w-5 animate-pulse rounded-full bg-slate-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  const userId = await getSessionUserId()

  return (
    <div>
      <div className="page-header flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="page-title">Mes tâches</h1>
          <p className="page-subtitle">
            Organisez votre journée et suivez votre productivité.
          </p>
        </div>
        {userId && (
          <Link href="/tasks/new" className="btn-primary shrink-0">
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle tâche
          </Link>
        )}
      </div>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList userId={userId} />
      </Suspense>
    </div>
  )
}
