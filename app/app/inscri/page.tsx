import Link from 'next/link'
import { RegisterForm } from '@/components/RegisterForm'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Inscription',
  description: 'Créez votre compte TaskFlow gratuitement.',
  path: '/inscri',
  noIndex: true,
})

export default function InscriPage() {
  return (
    <div className="auth-card">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inscription</h1>
        <p className="mt-2 text-sm text-slate-500">
          Créez votre compte gratuitement et commencez à organiser vos tâches.
        </p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        Déjà un compte ?{' '}
        <Link href="/auth" className="font-medium text-brand-600 hover:text-brand-700">
          Se connecter
        </Link>
      </p>
    </div>
  )
}
