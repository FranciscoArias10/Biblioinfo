import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewCard from '../components/ReviewCard'
import Spinner from '../components/Spinner'
import AlertMessage from '../components/AlertMessage'
import { getReviews } from '../services/api'

const GENRES = [
  'Todos los géneros',
  'Ficción',
  'Ciencia Ficción',
  'Fantasía',
  'Historia',
  'Romance',
  'Misterio',
  'Poesía',
  'Ensayo',
  'Desarrollo Personal',
  'No Ficción',
]

export default function ReviewList() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('Todos los géneros')

  const fetchReviewsData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getReviews()
      setReviews(data)
    } catch (err) {
      setError(err.message || 'No se pudieron cargar las reseñas del servidor')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviewsData()
  }, [])

  // Filtrado reactivo en tiempo real por búsqueda y por género
  const filteredReviews = useMemo(() => {
    return reviews.filter((item) => {
      const title = (item.libro || item.title || '').toLowerCase()
      const author = (item.autorLibro || item.bookAuthor || '').toLowerCase()
      const genre = item.genero || item.genre || ''
      const query = searchQuery.trim().toLowerCase()

      const matchesSearch = query === '' || title.includes(query) || author.includes(query)
      const matchesGenre =
        selectedGenre === 'Todos los géneros' ||
        genre.toLowerCase() === selectedGenre.toLowerCase()

      return matchesSearch && matchesGenre
    })
  }, [reviews, searchQuery, selectedGenre])

  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-paper-border dark:border-dark-border pb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-8 h-1 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Catálogo Comunitario
              </span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-paper-text dark:text-dark-text">
              Explorar Reseñas
            </h1>
            <p className="text-paper-muted dark:text-dark-muted text-sm sm:text-base mt-1">
              Descubre opiniones literarias persistidas en tiempo real por los miembros de BookVerse.
            </p>
          </div>

          <Link
            to="/registro"
            className="self-start sm:self-auto bg-accent hover:bg-accent-hover text-[#141312] font-bold px-5 py-2.5 rounded-full text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Escribir Reseña</span>
          </Link>
        </div>

        {/* Filter Controls: Search Input + Genre Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border p-4 rounded-2xl shadow-sm">
          {/* Search Box */}
          <div className="sm:col-span-2 relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-paper-dim dark:text-dark-dim">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar por título de libro o autor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-paper-border dark:border-dark-border bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-paper-dim hover:text-paper-text"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Genre Dropdown */}
          <div className="sm:col-span-1">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-paper-border dark:border-dark-border bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            >
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Area: Loading, Error, Empty State or Cards Grid */}
        {loading ? (
          <Spinner message="Conectando con el servidor backend y cargando catálogo..." size="lg" />
        ) : error ? (
          <div className="space-y-4">
            <AlertMessage
              type="error"
              message="No se pudo establecer conexión con el servidor backend"
              details={[
                error,
                'Asegúrate de que el backend de Node.js esté ejecutándose en http://localhost:5000',
              ]}
            />
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={fetchReviewsData}
                className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border px-5 py-2.5 rounded-full text-sm font-semibold hover:border-accent transition-colors"
              >
                Reintentar conexión
              </button>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          /* Empty State (Base de datos sin registros) */
          <div className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-3xl p-10 sm:p-14 text-center max-w-xl mx-auto flex flex-col items-center shadow-card-light dark:shadow-none">
            <div className="w-16 h-16 rounded-2xl bg-accent/15 flex items-center justify-center text-accent mb-5">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="font-serif font-black text-2xl text-paper-text dark:text-dark-text mb-2">
              Aún no hay reseñas registradas
            </h2>
            <p className="text-paper-muted dark:text-dark-muted text-sm sm:text-base mb-6 leading-relaxed">
              Sé el primer lector en inaugurar nuestra biblioteca compartiendo tu perspectiva crítica sobre tu libro preferido.
            </p>
            <Link
              to="/registro"
              className="bg-accent hover:bg-accent-hover text-[#141312] font-bold px-6 py-3 rounded-full text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Publicar la Primera Reseña</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ) : filteredReviews.length === 0 ? (
          /* Empty State por filtros de búsqueda */
          <div className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-2xl p-10 text-center max-w-md mx-auto">
            <h3 className="font-serif font-bold text-lg text-paper-text dark:text-dark-text mb-2">
              No se encontraron coincidencias
            </h3>
            <p className="text-sm text-paper-muted dark:text-dark-muted mb-4">
              Ninguna reseña coincide con tu término de búsqueda o género seleccionado.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedGenre('Todos los géneros')
              }}
              className="text-xs font-bold text-accent hover:underline"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          /* Grid de Reseñas */
          <div>
            <div className="flex items-center justify-between text-xs text-paper-dim dark:text-dark-dim mb-4 px-1">
              <span>Mostrando {filteredReviews.length} de {reviews.length} reseñas</span>
              {selectedGenre !== 'Todos los géneros' && (
                <span className="font-semibold text-accent">Filtro: {selectedGenre}</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
