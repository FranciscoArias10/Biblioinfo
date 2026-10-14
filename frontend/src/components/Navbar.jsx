import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper-header dark:bg-dark-header border-b border-paper-border dark:border-dark-border transition-colors duration-300">
      <nav
        aria-label="Principal"
        className="max-w-[1240px] mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4"
      >
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-paper-bg dark:text-dark-bg shadow-sm transition-transform duration-300 group-hover:scale-105">
            <svg
              aria-hidden="true"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
              <path d="M6 6h10" />
              <path d="M6 10h10" />
            </svg>
          </div>
          <span className="font-serif font-black text-2xl tracking-tight text-paper-text dark:text-dark-text">
            Biblio<span className="text-accent">Info</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`px-4 py-2 text-[15px] font-medium transition-colors ${
              location.pathname === '/'
                ? 'text-paper-text dark:text-dark-text font-bold border-b-2 border-accent'
                : 'text-paper-muted dark:text-dark-muted hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/registro"
            className={`px-4 py-2 text-[15px] font-medium transition-colors ${
              location.pathname === '/registro'
                ? 'text-paper-text dark:text-dark-text font-bold border-b-2 border-accent'
                : 'text-paper-muted dark:text-dark-muted hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Escribir Reseña
          </Link>
          <Link
            to="/lista"
            className={`px-4 py-2 text-[15px] font-medium transition-colors ${
              location.pathname === '/lista'
                ? 'text-paper-text dark:text-dark-text font-bold border-b-2 border-accent'
                : 'text-paper-muted dark:text-dark-muted hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Explorar Reseñas
          </Link>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-10 h-10 rounded-full border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            {isDark ? (
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-accent"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-paper-text"
              >
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
              </svg>
            )}
          </button>

          {/* CTA Button */}
          <Link
            to="/registro"
            className="bg-accent hover:bg-accent-hover active:scale-95 text-[#141312] font-bold text-sm rounded-full px-4 py-2 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Publicar</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
