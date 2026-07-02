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
    <div className="flex max-w-lg flex-col gap-6">
      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-900">
            Titre
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={defaultValues.title}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-900">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={defaultValues.description ?? ''}
            className="w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-900">
          <input
            type="checkbox"
            name="completed"
            defaultChecked={defaultValues.completed}
          />
          Terminée
        </label>
        {state.message && (
          <p className={`text-sm ${state.success ? 'text-green-600' : 'text-red-600'}`}>
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>

      <form action={deleteTaskAction.bind(null, taskId)}>
        <button
          type="submit"
          className="rounded border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50"
        >
          Supprimer la tâche
        </button>
      </form>
    </div>
  )
}
