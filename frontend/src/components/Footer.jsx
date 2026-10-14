import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#1E1A17] dark:bg-[#0E0D0C] text-[#F3ECE2] border-t border-paper-border dark:border-dark-border transition-colors duration-300 mt-auto">
      <div className="max-w-[1240px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        {/* Left: Branding & Copyright */}
        <div className="flex flex-col gap-1 items-center sm:items-start">
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-xl tracking-tight text-[#F3ECE2]">
              Biblio<span className="text-accent">Info</span>
            </span>
          </div>
          <span className="text-xs text-[#A39789]">
            © 2026 BiblioInfo · Plataforma de Reseñas de Libros · Componente Práctico
          </span>
        </div>

        {/* Right: Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-[#C9BFB4]">
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
