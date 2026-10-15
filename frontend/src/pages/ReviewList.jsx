import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ReviewList() {
  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-6 py-16 flex flex-col items-center justify-center text-center gap-6">
        <span className="w-14 h-1 rounded-full bg-accent" />
        <h1 className="font-serif font-black text-3xl sm:text-5xl">
          Catálogo de Reseñas
        </h1>
        <p className="text-paper-muted dark:text-dark-muted max-w-xl text-lg">
          Esta vista está asignada a Francisco (Frontend Lead) para el consumo con `useEffect` y filtros dinámicos.
        </p>
        <Link
          to="/registro"
          className="bg-accent hover:bg-accent-hover text-[#141312] font-bold px-6 py-3 rounded-full transition-all"
        >
          Ir a Registrar Reseña
        </Link>
      </main>

      <Footer />
    </div>
  )
}
