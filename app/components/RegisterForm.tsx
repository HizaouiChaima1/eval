'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { registerAction } from '@/app/actions/user'
import type { ActionState } from '@/app/actions/auth'

const initialState: ActionState = { success: false, message: '' }

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction, pending] = useActionState(registerAction, initialState)

  useEffect(() => {
    if (state.success) {
      router.push('/auth')
    }
  }, [state.success, router])

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label htmlFor="name" className="label">
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Votre nom"
          className="input"
        />
        {state.errors?.name && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="vous@exemple.com"
          className="input"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <label htmlFor="password" className="label">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="input"
        />
        {state.errors?.password && (
          <p className="mt-1.5 text-sm text-red-600">{state.errors.password[0]}</p>
        )}
      </div>
      {state.message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            state.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
          }`}
        >
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? 'Inscription...' : "S'inscrire"}
      </button>
    </form>
  )
}
