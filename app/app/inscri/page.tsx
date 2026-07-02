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
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Inscription</h1>
      <RegisterForm />
    </div>
  )
}
