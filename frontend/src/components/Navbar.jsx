import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import BookLogo from './BookLogo'

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper-header dark:bg-dark-header border-b border-paper-border dark:border-dark-border transition-colors duration-300">
      <nav
        aria-label="Principal"
        className="max-w-[1240px] mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between"
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 flex-shrink-0"
        >
          <BookLogo
            size={38}
            idPrefix="bvLogoNav"
            textSize="text-xl sm:text-2xl"
          />
        </Link>

        {/* Desktop Navigation Links (hidden on mobile/tablet < md) */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            aria-current={location.pathname === '/' ? 'page' : undefined}
            className={`px-3.5 py-2 text-[15px] transition-colors flex flex-col items-center gap-1 ${
              location.pathname === '/'
                ? 'text-paper-text dark:text-dark-text font-bold'
                : 'text-paper-muted dark:text-dark-muted font-medium hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Inicio
            {location.pathname === '/' && (
              <span className="w-4 h-[3px] rounded-full bg-accent" />
            )}
          </Link>
          <Link
            to="/registro"
            aria-current={location.pathname === '/registro' ? 'page' : undefined}
            className={`px-3.5 py-2 text-[15px] transition-colors flex flex-col items-center gap-1 ${
              location.pathname === '/registro'
                ? 'text-paper-text dark:text-dark-text font-bold'
                : 'text-paper-muted dark:text-dark-muted font-medium hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Escribir Reseña
            {location.pathname === '/registro' && (
              <span className="w-4 h-[3px] rounded-full bg-accent" />
            )}
          </Link>
          <Link
            to="/lista"
            aria-current={location.pathname === '/lista' ? 'page' : undefined}
            className={`px-3.5 py-2 text-[15px] transition-colors flex flex-col items-center gap-1 ${
              location.pathname === '/lista'
                ? 'text-paper-text dark:text-dark-text font-bold'
                : 'text-paper-muted dark:text-dark-muted font-medium hover:text-paper-text dark:hover:text-dark-text'
            }`}
          >
            Explorar Reseñas
            {location.pathname === '/lista' && (
              <span className="w-4 h-[3px] rounded-full bg-accent" />
            )}
          </Link>
        </div>

        {/* Desktop Controls (hidden on mobile/tablet < md) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-10 h-10 rounded-full border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm"
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
                className="text-paper-text dark:text-dark-text"
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
                className="text-paper-text dark:text-dark-text"
              >
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
              </svg>
            )}
          </button>

          {/* CTA Link to /registro */}
          <Link
            to="/registro"
            className="bg-accent hover:bg-accent-hover text-[#141312] font-bold text-[14px] sm:text-[15px] rounded-full px-5 py-2.5 flex items-center gap-2 transition-all shadow-sm hover:shadow active:scale-98"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Publicar Reseña</span>
          </Link>
        </div>

        {/* Mobile Right Controls: Theme Toggle + Hamburger Button (shown on < md) */}
        <div className="flex md:hidden items-center gap-2">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-9 h-9 rounded-full border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          >
            {isDark ? (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
              </svg>
            )}
          </button>

          {/* Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            className="w-10 h-10 rounded-xl border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text flex items-center justify-center cursor-pointer transition-transform active:scale-95 shadow-sm"
          >
            {isOpen ? (
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-paper-border dark:border-dark-border bg-paper-surface/98 dark:bg-dark-surface/98 backdrop-blur-lg px-6 py-5 flex flex-col gap-3 shadow-xl animate-fade-in">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
              location.pathname === '/'
                ? 'bg-accent/15 text-accent'
                : 'text-paper-text dark:text-dark-text hover:bg-paper-band dark:hover:bg-dark-band'
            }`}
          >
            <span>Inicio</span>
            {location.pathname === '/' && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </Link>

          <Link
            to="/registro"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
              location.pathname === '/registro'
                ? 'bg-accent/15 text-accent'
                : 'text-paper-text dark:text-dark-text hover:bg-paper-band dark:hover:bg-dark-band'
            }`}
          >
            <span>Escribir Reseña</span>
            {location.pathname === '/registro' && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </Link>

          <Link
            to="/lista"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-xl text-base font-bold flex items-center justify-between transition-colors ${
              location.pathname === '/lista'
                ? 'bg-accent/15 text-accent'
                : 'text-paper-text dark:text-dark-text hover:bg-paper-band dark:hover:bg-dark-band'
            }`}
          >
            <span>Explorar Reseñas</span>
            {location.pathname === '/lista' && (
              <span className="w-2 h-2 rounded-full bg-accent" />
            )}
          </Link>

          {/* Full Width Button in Mobile Menu */}
          <div className="pt-2">
            <Link
              to="/registro"
              onClick={() => setIsOpen(false)}
              className="w-full bg-accent hover:bg-accent-hover text-[#141312] font-black text-base rounded-full py-3.5 flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span>Publicar Reseña</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
