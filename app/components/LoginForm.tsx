'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { loginAction, type ActionState } from '@/app/actions/auth'

const initialState: ActionState = { success: false, message: '' }

export function LoginForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(loginAction, initialState)

  useEffect(() => {
    if (state.success) {
      router.push('/')
      router.refresh()
    }
  }, [state.success, router])

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
        />
        {state.errors?.password && (
          <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>
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
        {pending ? 'Connexion...' : "S'authentifier"}
      </button>
    </form>
  )
}
