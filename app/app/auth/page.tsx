import Link from 'next/link'
import { LoginForm } from '@/components/LoginForm'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'Connexion',
  description: 'Connectez-vous à votre compte TaskFlow.',
  path: '/auth',
  noIndex: true,
})

export default function AuthPage() {
  return (
    <div className="auth-card">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Connexion</h1>
        <p className="mt-2 text-sm text-slate-500">
          Accédez à vos tâches et reprenez là où vous en étiez.
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        Pas encore de compte ?{' '}
        <Link href="/inscri" className="font-medium text-brand-600 hover:text-brand-700">
          S&apos;inscrire
        </Link>
      </p>
    </div>
  )
}
