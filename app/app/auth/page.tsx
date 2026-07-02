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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Connexion</h1>
      <LoginForm />
    </div>
  )
}
