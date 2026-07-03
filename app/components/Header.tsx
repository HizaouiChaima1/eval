import Link from 'next/link'
import { logoutAction } from '@/app/actions/auth'

type HeaderProps = {
  isAuthenticated: boolean
}

export function Header({ isAuthenticated }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white shadow-sm shadow-brand-600/30 transition-transform group-hover:scale-105">
            T
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Tasks
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm sm:gap-2">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            Accueil
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                href="/tasks/new"
                className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Nouvelle tâche
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  Déconnexion
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/auth"
                className="rounded-lg px-3 py-1.5 font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                Connexion
              </Link>
              <Link href="/inscri" className="btn-primary !px-4 !py-1.5 !text-sm">
                Inscription
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
