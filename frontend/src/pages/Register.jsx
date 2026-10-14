import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 max-w-[1240px] mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
        <span className="w-16 h-1 rounded-full bg-accent mb-6" />
        <h1 className="font-serif font-black text-3xl sm:text-5xl text-paper-text dark:text-dark-text mb-4">
          Publicar una Reseña
        </h1>
        <p className="text-paper-muted dark:text-dark-muted max-w-lg mb-8 text-lg">
          El formulario controlado de registro con validaciones en cliente y conexión a la API REST se implementará en la siguiente fase.
        </p>
        <Link
          to="/"
          className="bg-accent hover:bg-accent-hover text-[#141312] font-bold px-6 py-3 rounded-full transition-all"
        >
          Volver al Inicio
        </Link>
      </main>
      <Footer />
    </div>
  )
}
