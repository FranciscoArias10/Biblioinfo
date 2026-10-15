import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center gap-8">
        <span className="w-16 h-1 rounded-full bg-accent" />
        <h1 className="font-serif font-black text-4xl sm:text-6xl max-w-3xl leading-tight">
          Descubre tu próxima lectura a través de ojos apasionados.
        </h1>
        <p className="text-lg sm:text-xl text-paper-muted dark:text-dark-muted max-w-2xl leading-relaxed">
          BiblioInfo es la plataforma comunitaria para explorar opiniones reales, compartir tus críticas literarias y registrar tus libros favoritos.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/registro"
            className="bg-accent hover:bg-accent-hover text-[#141312] font-black px-8 py-4 rounded-full text-base shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
          >
            Escribir una Reseña
          </Link>
          <Link
            to="/lista"
            className="border-1.5 border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text font-bold px-8 py-4 rounded-full text-base transition-all hover:-translate-y-0.5"
          >
            Explorar Reseñas
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
