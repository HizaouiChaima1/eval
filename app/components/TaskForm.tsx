'use client'

import { useActionState } from 'react'
import { createTaskAction } from '@/app/actions/tasks'
import type { ActionState } from '@/app/actions/auth'

const initialState: ActionState = { success: false, message: '' }

export function TaskForm() {
  const [state, formAction, pending] = useActionState(createTaskAction, initialState)

  return (
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
          placeholder="Ex. Préparer la réunion"
          className="input"
        />
        {state.errors?.title && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.title[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Détails optionnels..."
          className="input resize-none"
        />
        {state.errors?.description && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.description[0]}</p>
        )}
      </div>
      {state.message && !state.success && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.message}</p>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full sm:w-auto">
        {pending ? 'Création...' : 'Créer la tâche'}
      </button>
    </form>
  )
}
