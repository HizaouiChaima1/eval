'use client'

import { useActionState } from 'react'
import { updateTaskAction, deleteTaskAction } from '@/app/actions/tasks'
import type { ActionState } from '@/app/actions/auth'

type TaskEditFormProps = {
  taskId: number
  defaultValues: {
    title: string
    description: string | null
    completed: boolean
  }
}

export function TaskEditForm({ taskId, defaultValues }: TaskEditFormProps) {
  const boundUpdate = updateTaskAction.bind(null, taskId)
  const [state, formAction, pending] = useActionState(boundUpdate, {
    success: false,
    message: '',
  } satisfies ActionState)

  return (
    <div className="flex flex-col gap-4">
      <form action={formAction} className="card flex flex-col gap-5 p-6">
        <div>
          <label htmlFor="title" className="label">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={defaultValues.title}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="description" className="label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={defaultValues.description ?? ''}
            className="input resize-none"
          />
        </div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50">
          <input
            type="checkbox"
            name="completed"
            defaultChecked={defaultValues.completed}
            className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
          />
          Marquer comme terminée
        </label>
        {state.message && (
          <p
            className={`rounded-lg px-3 py-2 text-sm ${
              state.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
            }`}
          >
            {state.message}
          </p>
        )}
        <button type="submit" disabled={pending} className="btn-primary w-full sm:w-auto">
          {pending ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>

      <form action={deleteTaskAction.bind(null, taskId)} className="card p-6">
        <button type="submit" className="btn-danger">
          Supprimer la tâche
        </button>
      </form>
    </div>
  )
}
