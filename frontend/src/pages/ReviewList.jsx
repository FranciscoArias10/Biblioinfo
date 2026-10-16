import { useEffect, useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookCover from '../components/BookCover'
import Spinner from '../components/Spinner'
import { getReviews } from '../services/api'
import { getBookPalette } from '../utils/palette'
import { useSEO } from '../utils/seo'

/**
 * Group raw review items by book title to calculate averages and collect all reviews per book
 */
function groupReviewsByBook(reviewsList) {
  const map = new Map()

  for (const r of reviewsList) {
    const rawTitle = (r.libro || r.title || 'Sin título').trim()
    const key = rawTitle.toLowerCase()

    if (!map.has(key)) {
      const palette = getBookPalette(rawTitle, r.genero || r.genre)
      map.set(key, {
        id: r.id,
        title: rawTitle,
        author: (r.autorLibro || r.author || r.bookAuthor || 'Autor desconocido').trim(),
        genre: r.genero || r.genre || 'Ficción',
        portada: r.portada || null,
        libroId: r.libroId || null,
        bg: r.bg || palette.bg,
        fg: r.fg || palette.fg,
        reviews: [],
      })
    }

    const item = map.get(key)
    if ((!item.author || item.author === 'Autor desconocido') && r.autorLibro) {
      item.author = r.autorLibro.trim()
    }
    if ((!item.genre || item.genre === 'Ficción') && r.genero) {
      item.genre = r.genero
    }
    if (!item.portada && r.portada) {
      item.portada = r.portada
    }
    if (!item.libroId && r.libroId) {
      item.libroId = r.libroId
    }
    if (!item.bg && r.bg) item.bg = r.bg
    if (!item.fg && r.fg) item.fg = r.fg

    item.reviews.push(r)
  }

  // Calculate average rating for each book and review count
  return Array.from(map.values()).map((book) => {
    const totalScore = book.reviews.reduce(
      (acc, rev) => acc + Number(rev.calificacion || rev.rating || 5),
      0
    )
    const average = book.reviews.length > 0 ? totalScore / book.reviews.length : 5
    return {
      ...book,
      averageRating: Number(average.toFixed(1)),
      reviewCount: book.reviews.length,
    }
  })
}

const CANONICAL_GENRES = [
  'Todos',
  'Ficción',
  'Ciencia Ficción',
  'Fantasía',
  'Historia',
  'Romance',
  'Misterio',
  'Poesía',
  'Ensayo',
  'Desarrollo Personal',
  'Clásico',
]

export default function ReviewList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const selectedGenre = searchParams.get('genero') || ''

  useSEO({
    title: selectedGenre && selectedGenre.toLowerCase() !== 'todos'
      ? `Reseñas de ${selectedGenre} — Catálogo Biblioinfo`
      : 'Catálogo de Libros y Reseñas Literarias — Biblioinfo',
    description: 'Explora y consulta el catálogo completo de libros con calificaciones y opiniones de lectores. Filtra por género o busca por autor en tiempo real.',
    keywords: 'catálogo de libros, reseñas de libros, estantería de libros, críticas literarias, Biblioinfo',
    canonical: 'http://localhost:5173/lista',
  })

  // Estado local del input: refleja exactamente lo que el usuario escribe (incluyendo espacios intermedios)
  const [inputValue, setInputValue] = useState(searchQuery)

  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getReviews()
        if (isMounted) {
          setReviews(data)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  // Dynamic available genres list combining canonical and database genres
  const availableGenres = useMemo(() => {
    const list = [...CANONICAL_GENRES]
    reviews.forEach((r) => {
      const g = (r.genero || r.genre || '').trim()
      if (g && !list.some((item) => item.toLowerCase() === g.toLowerCase())) {
        list.push(g)
      }
    })
    return list
  }, [reviews])

  // Group reviews into unique books, sort them by average rating (promedio), and filter by search & genre
  const books = useMemo(() => {
    const grouped = groupReviewsByBook(reviews)

    // Sort by average rating descending (highest average rating first)
    grouped.sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating
      }
      return b.reviewCount - a.reviewCount
    })

    let filtered = grouped

    // Filter by genre pill (exact normalized match)
    if (selectedGenre && selectedGenre.toLowerCase() !== 'todos') {
      const normalize = (str) =>
        str
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')

      const gQueryNorm = normalize(selectedGenre)

      filtered = filtered.filter((book) => {
        const bookGNorm = normalize(book.genre || '')
        const hasMatchingReview =
          book.reviews &&
          book.reviews.some((r) => {
            const revGenreNorm = normalize(r.genero || r.genre || '')
            return revGenreNorm === gQueryNorm
          })
        return bookGNorm === gQueryNorm || hasMatchingReview
      })
    }

    // Filter by search query (nombre del libro o autor)
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [reviews, searchQuery, selectedGenre])

  const handleSearchChange = (val) => {
    // Actualizar el input visualmente con el valor exacto (con espacios)
    setInputValue(val)
    // Actualizar la URL con el valor trimmed para el filtrado
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (!val.trim()) {
        next.delete('q')
      } else {
        next.set('q', val.trim())
      }
      return next
    })
  }

  const handleGenreSelect = (genre) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (genre === 'Todos' || genre.toLowerCase() === 'todos') {
        next.delete('genero')
      } else {
        next.set('genero', genre)
      }
      return next
    })
  }

  const handleResetAllFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.delete('q')
      next.delete('genero')
      return next
    })
  }

  return (
    <div className="min-h-screen bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text transition-colors duration-300 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex flex-col gap-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-accent tracking-wider uppercase">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-paper-muted dark:text-dark-muted">
            Explorar Reseñas
          </span>
        </div>

        {/* Simple & Clean Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto">
          <svg
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-paper-dim dark:text-dark-dim pointer-events-none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Buscar por nombre del libro o autor..."
            className="w-full pl-12 pr-11 py-3.5 rounded-full border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-sm text-paper-dim hover:text-paper-text dark:text-dark-dim dark:hover:text-dark-text cursor-pointer"
              aria-label="Borrar búsqueda"
            >
              ✕
            </button>
          )}
        </div>

        {/* Pastillas de Filtro por Género (Genre Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto -mt-2">
          {availableGenres.map((g) => {
            const isSelected =
              (!selectedGenre && g === 'Todos') ||
              (selectedGenre && selectedGenre.toLowerCase() === g.toLowerCase())

            return (
              <button
                key={g}
                type="button"
                onClick={() => handleGenreSelect(g)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-accent text-[#141312] font-black shadow-md scale-105 ring-2 ring-accent/30'
                    : 'bg-paper-surface dark:bg-dark-surface border border-paper-borderStrong dark:border-dark-borderStrong text-paper-text dark:text-dark-text hover:border-accent hover:text-accent hover:scale-102'
                }`}
              >
                {g}
              </button>
            )
          })}
        </div>

        {/* Results Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-paper-muted dark:text-dark-muted px-1">
          <span>
            {books.length} {books.length === 1 ? 'libro' : 'libros'} en la estantería{' '}
            {selectedGenre && selectedGenre.toLowerCase() !== 'todos' && (
              <span className="font-bold text-accent">de {selectedGenre}{' '}</span>
            )}
            (ordenados por mayor promedio)
          </span>
          {(searchQuery || (selectedGenre && selectedGenre.toLowerCase() !== 'todos')) && (
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="text-accent hover:underline font-bold"
            >
              Mostrar todos los libros y géneros
            </button>
          )}
        </div>

        {/* Book Shelf Content */}
        {isLoading ? (
          <Spinner text="Cargando estantería de libros..." />
        ) : books.length === 0 ? (
          /* Empty State */
          <div className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-3xl p-12 text-center flex flex-col items-center gap-4 my-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center text-accent">
              <svg
                aria-hidden="true"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="font-serif font-black text-2xl text-paper-text dark:text-dark-text">
              No se encontró ningún libro
            </h3>
            <p className="text-sm text-paper-muted dark:text-dark-muted max-w-md">
              No hay obras que coincidan
              {searchQuery ? ` con "${searchQuery}"` : ''}
              {searchQuery && selectedGenre && selectedGenre.toLowerCase() !== 'todos' ? ' en el género ' : ''}
              {!searchQuery && selectedGenre && selectedGenre.toLowerCase() !== 'todos' ? ' con el género ' : ''}
              {selectedGenre && selectedGenre.toLowerCase() !== 'todos' ? `"${selectedGenre}"` : ''}.
            </p>
            <button
              type="button"
              onClick={handleResetAllFilters}
              className="mt-2 text-accent font-bold text-sm hover:underline"
            >
              Restablecer todos los filtros
            </button>
          </div>
        ) : (
          /* The Book Shelf: SIZE L BOOK COVERS ONLY (No outside name, author, genre or review) */
          <div className="bg-paper-band dark:bg-dark-surface/40 border border-paper-border dark:border-dark-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12 justify-items-center">
              {books.map((book) => (
                <Link
                  key={book.title}
                  to={`/libro/${encodeURIComponent(book.title)}`}
                  className="group flex flex-col items-center select-none no-underline text-inherit cursor-pointer"
                  title={`Ver detalles y todas las reseñas de "${book.title}"`}
                >
                  {/* Book cover in size L with average rating and review count as in Classics section */}
                  <BookCover
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    portada={book.portada}
                    bg={book.bg}
                    fg={book.fg}
                    size="lg"
                    count={`★ ${book.averageRating.toFixed(1)} · ${book.reviewCount} ${book.reviewCount === 1 ? 'reseña' : 'reseñas'}`}
                    interactive={true}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
