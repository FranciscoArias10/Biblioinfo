import { Link } from 'react-router-dom'
import BookLogo from './BookLogo'

export default function Footer() {
  return (
    <footer className="bg-[#1E1A17] dark:bg-[#0E0D0C] text-[#F3ECE2] border-t border-paper-border dark:border-dark-border transition-colors duration-300 mt-auto">
      <div className="max-w-[1240px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Branding & Academic attribution */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <BookLogo
            size={36}
            idPrefix="bvLogoFoot"
            textSize="text-xl"
            textColor="#F3ECE2"
            textAccentColor="#E08738"
          />
          <span className="text-[13px] text-[#A39789] max-w-md">
            © 2026 Biblioinfo · Plataforma de Reseñas de Libros
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
