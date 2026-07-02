'use client'

import { useActionState } from 'react'
import { createTaskAction } from '@/app/actions/tasks'
import type { ActionState } from '@/app/actions/auth'

const initialState: ActionState = { success: false, message: '' }

export function TaskForm() {
  const [state, formAction, pending] = useActionState(createTaskAction, initialState)

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-900">
          Titre
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.errors?.title && (
          <p className="mt-1 text-sm text-red-600">{state.errors.title[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-900">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-600">{state.errors.description[0]}</p>
        )}
      </div>
      {state.message && !state.success && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? 'Création...' : 'Créer la tâche'}
      </button>
    </form>
  )
}
