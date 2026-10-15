import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookCover from '../components/BookCover'
import Spinner from '../components/Spinner'
import { getReviews, INITIAL_REVIEWS } from '../services/api'

export default function BookDetail() {
  const { id } = useParams()
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  useEffect(() => {
    let isMounted = true
    async function fetchData() {
      setIsLoading(true)
      try {
        const data = await getReviews()
        if (isMounted) {
          setReviews(data && data.length > 0 ? data : INITIAL_REVIEWS)
        }
      } catch (err) {
        console.error('Error fetching reviews:', err)
        if (isMounted) setReviews(INITIAL_REVIEWS)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  // Find book and all matching reviews by ID or title slug
  const bookData = useMemo(() => {
    if (!id || reviews.length === 0) return null

    let decodedId = id.trim().toLowerCase()
    try {
      decodedId = decodeURIComponent(id).trim().toLowerCase()
    } catch {
      // id was already decoded or contains raw %
    }

    // Filter all reviews matching this book title or id
    const matchedReviews = reviews.filter((r) => {
      const title = (r.libro || r.title || '').trim().toLowerCase()
      const reviewId = (r.id || '').toString().toLowerCase()
      return title === decodedId || reviewId === decodedId
    })

    if (matchedReviews.length === 0) {
      // Fuzzy search by substring if exact match failed
      const fuzzy = reviews.filter((r) => {
        const title = (r.libro || r.title || '').trim().toLowerCase()
        return title.includes(decodedId) || decodedId.includes(title)
      })
      if (fuzzy.length > 0) {
        matchedReviews.push(...fuzzy)
      }
    }

    if (matchedReviews.length === 0) return null

    const first = matchedReviews[0]
    const title = first.libro || first.title || 'Sin título'
    const author = first.autorLibro || first.author || first.bookAuthor || 'Autor desconocido'
    const genre = first.genero || first.genre || 'Ficción'

    // Calculate rating average
    const totalScore = matchedReviews.reduce(
      (acc, rev) => acc + Number(rev.calificacion || rev.rating || 5),
      0
    )
    const average = totalScore / matchedReviews.length

    return {
      title,
      author,
      genre,
      bg: first.bg,
      fg: first.fg,
      averageRating: Number(average.toFixed(1)),
      reviews: matchedReviews,
    }
  }, [id, reviews])

  return (
    <div className="min-h-screen bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text transition-colors duration-300 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-14 w-full flex flex-col gap-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-accent tracking-wider uppercase">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/lista" className="hover:underline">
            Explorar Reseñas
          </Link>
          {bookData && (
            <>
              <span>/</span>
              <span className="text-paper-muted dark:text-dark-muted truncate max-w-[200px] sm:max-w-md">
                {bookData.title}
              </span>
            </>
          )}
        </div>

        {isLoading ? (
          <Spinner text="Cargando detalles del libro..." />
        ) : !bookData ? (
          /* Book Not Found */
          <div className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-3xl p-12 text-center flex flex-col items-center gap-4 my-8 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-accent/15 text-accent flex items-center justify-center text-3xl">
              📖
            </div>
            <h2 className="font-serif font-black text-2xl text-paper-text dark:text-dark-text">
              Libro no encontrado
            </h2>
            <p className="text-sm text-paper-muted dark:text-dark-muted max-w-md">
              No encontramos registros para esta obra. Puedes volver al catálogo o escribir su primera reseña.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/lista"
                className="bg-accent hover:bg-accent-hover text-[#141312] font-black text-sm px-6 py-3 rounded-full transition-transform hover:scale-105"
              >
                Volver a la estantería
              </Link>
              <Link
                to="/registro"
                className="border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text font-bold text-sm px-6 py-3 rounded-full"
              >
                Escribir reseña
              </Link>
            </div>
          </div>
        ) : (
          /* Dedicated Book Page Content */
          <div className="flex flex-col gap-12">
            {/* PARTE SUPERIOR: Portada + Nombre completo, Autor, Género y Promedio */}
            <section className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card-light dark:shadow-none flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
              {/* Book Cover (prominent size XL on desktop, size LG on mobile) */}
              <div className="flex-shrink-0">
                <BookCover
                  title={bookData.title}
                  author={bookData.author}
                  genre={bookData.genre}
                  bg={bookData.bg}
                  fg={bookData.fg}
                  size="xl"
                  interactive={true}
                  className="hidden sm:inline-flex"
                />
                <BookCover
                  title={bookData.title}
                  author={bookData.author}
                  genre={bookData.genre}
                  bg={bookData.bg}
                  fg={bookData.fg}
                  size="lg"
                  interactive={false}
                  className="inline-flex sm:hidden"
                />
              </div>

              {/* Primary Book Information */}
              <div className="flex flex-col gap-4 flex-1 min-w-0 text-center md:text-left">
                {/* Género */}
                <div>
                  <span className="inline-block text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-full bg-accent/15 text-accent-dark dark:text-accent border border-accent/30">
                    {bookData.genre}
                  </span>
                </div>

                {/* Nombre completo de la obra */}
                <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-paper-text dark:text-dark-text leading-tight tracking-tight">
                  {bookData.title}
                </h1>

                {/* Autor */}
                <p className="text-base sm:text-lg text-paper-muted dark:text-dark-muted font-medium m-0">
                  Por <strong className="text-paper-text dark:text-dark-text">{bookData.author}</strong>
                </p>

                {/* Promedio de todas las calificaciones */}
                <div className="p-4 sm:p-5 rounded-2xl bg-paper-band dark:bg-dark-band/80 border border-paper-border dark:border-dark-border flex flex-col sm:flex-row items-center gap-4 justify-between max-w-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-accent">
                      ★ {bookData.averageRating}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-accent text-base tracking-widest leading-none">
                        {'★'.repeat(Math.round(bookData.averageRating))}
                        {'☆'.repeat(5 - Math.round(bookData.averageRating))}
                      </span>
                      <span className="text-xs text-paper-muted dark:text-dark-muted mt-1 font-medium">
                        Promedio general de calificación
                      </span>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-bold text-paper-text dark:text-dark-text px-3 py-1.5 rounded-full bg-paper-surface dark:bg-dark-surface border border-paper-border dark:border-dark-border">
                    {bookData.reviews.length}{' '}
                    {bookData.reviews.length === 1 ? 'reseña registrada' : 'reseñas registradas'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3.5 pt-2 justify-center md:justify-start">
                  <Link
                    to={`/registro?libro=${encodeURIComponent(bookData.title)}`}
                    className="bg-accent hover:bg-accent-hover text-[#141312] font-black text-sm sm:text-base rounded-full px-6 py-3.5 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md"
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <span>Escribir una Reseña</span>
                  </Link>
                  <Link
                    to="/lista"
                    className="border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text hover:bg-paper-band dark:hover:bg-dark-surface/80 font-bold text-sm sm:text-base rounded-full px-6 py-3.5 transition-colors"
                  >
                    Volver a la Estantería
                  </Link>
                </div>
              </div>
            </section>

            {/* PARTE INFERIOR: Todas las Reseñas del libro */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between border-b border-paper-border dark:border-dark-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-1 rounded-full bg-accent" />
                  <h2 className="font-serif font-black text-2xl sm:text-3xl text-paper-text dark:text-dark-text">
                    Reseñas de la Comunidad ({bookData.reviews.length})
                  </h2>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {bookData.reviews.map((rev, idx) => {
                  const revName = rev.nombre || rev.user || 'Lector anónimo'
                  const revRating = Number(rev.calificacion || rev.rating || 5)
                  const revDate = rev.fecha || rev.date || 'Reciente'
                  const revText = rev.descripcion || rev.excerpt || 'Sin comentarios adicionales.'

                  return (
                    <article
                      key={rev.id || idx}
                      className="p-5 sm:p-7 rounded-2xl bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border flex flex-col gap-3 shadow-sm hover:border-accent/40 transition-colors"
                    >
                      {/* Reviewer Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent/20 text-accent font-black text-sm flex items-center justify-center flex-shrink-0">
                            {revName.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-base text-paper-text dark:text-dark-text">
                              {revName}
                            </span>
                            {rev.email && (
                              <span className="text-xs text-paper-muted dark:text-dark-muted">
                                {rev.email}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className="text-accent text-sm font-bold tracking-wider"
                            aria-label={`${revRating} de 5 estrellas`}
                          >
                            {'★'.repeat(revRating)}
                            {'☆'.repeat(5 - revRating)}
                          </span>
                          <span className="text-xs text-paper-dim dark:text-dark-dim">
                            {revDate}
                          </span>
                        </div>
                      </div>

                      {/* Review Body */}
                      <p className="text-[15px] sm:text-base leading-relaxed text-paper-body dark:text-dark-body m-0 whitespace-pre-wrap pt-1">
                        {revText}
                      </p>
                    </article>
                  )
                })}
              </div>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
