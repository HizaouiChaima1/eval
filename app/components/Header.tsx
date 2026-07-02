import Link from 'next/link'
import { logoutAction } from '@/app/actions/auth'

type HeaderProps = {
  isAuthenticated: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-gray-900">
          TaskFlow
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Accueil
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/tasks/new" className="text-gray-600 hover:text-gray-900">
                Nouvelle tâche
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="text-gray-600 hover:text-gray-900">
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/auth" className="text-gray-600 hover:text-gray-900">
                Connexion
              </Link>
              <Link href="/inscri" className="text-gray-600 hover:text-gray-900">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
