import { Link } from 'react-router-dom'
import { LOGO_FIG_PATH, LOGO_LAUREL_PATH } from '../data/landingData'

export default function Footer() {
  return (
    <footer className="bg-[#1E1A17] dark:bg-[#0E0D0C] text-[#F3ECE2] border-t border-paper-border dark:border-dark-border transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col gap-2.5 items-center sm:items-start">
          <div className="flex items-center gap-2.5">
            <svg
              aria-hidden="true"
              width="36"
              height="36"
              viewBox="0 0 380 380"
              className="flex-shrink-0"
            >
              <defs>
                <clipPath id="bvLogoFoot">
                  <rect x="26" y="26" width="328" height="328" rx="62" />
                </clipPath>
              </defs>
              <rect width="380" height="380" rx="88" fill="#E08738" />
              <g clipPath="url(#bvLogoFoot)">
                <g transform="translate(34 12) scale(0.92)">
                  <path d={LOGO_FIG_PATH} fill="#141312" fillRule="evenodd" />
                  <path d={LOGO_LAUREL_PATH} fill="#F3ECE2" fillRule="evenodd" />
                </g>
              </g>
            </svg>
            <span className="font-serif font-black text-xl tracking-tight text-[#F3ECE2]">
              Book<span className="text-accent">Verse</span>
            </span>
          </div>
          <span className="text-xs sm:text-[13px] text-[#A39789]">
            © 2026 BookVerse · Proyecto académico — Plataforma de Reseñas de Libros
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-[#C9BFB4]">
          <Link to="/" className="hover:text-accent transition-colors">
            Inicio
          </Link>
          <Link to="/registro" className="hover:text-accent transition-colors">
            Escribir Reseña
          </Link>
          <Link to="/lista" className="hover:text-accent transition-colors">
            Explorar Reseñas
          </Link>
        </div>
      </div>
    </footer>
  )
}
