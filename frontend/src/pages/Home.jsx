import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BookCover from '../components/BookCover'
import ReviewCard from '../components/ReviewCard'
import { getReviews, INITIAL_REVIEWS } from '../services/api'

export default function Home() {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState(INITIAL_REVIEWS.slice(0, 6))

  const accentColor = '#E08738'

  // Fetch reviews on mount
  useEffect(() => {
    let isMounted = true
    async function loadReviews() {
      try {
        const data = await getReviews()
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setReviews(data.slice(0, 6))
        }
      } catch (err) {
        console.error('Error al cargar reseñas:', err)
      }
    }
    loadReviews()
    return () => {
      isMounted = false
    }
  }, [])

  // Classics list matching design
  const classics = [
    { title: 'Dune', author: 'Frank Herbert', bg: '#C9733A', fg: '#141312', count: '4.8 · 142 reseñas' },
    { title: 'La sombra del viento', author: 'C. Ruiz Zafón', bg: '#141312', fg: '#F3ECE2', count: '4.9 · 210 reseñas' },
    { title: 'Rayuela', author: 'Julio Cortázar', bg: '#F3ECE2', fg: '#141312', count: '4.7 · 98 reseñas' },
    { title: 'Ficciones', author: 'J. L. Borges', bg: '#3B2C4A', fg: '#F3ECE2', count: '4.9 · 175 reseñas' },
    { title: 'Orgullo y prejuicio', author: 'Jane Austen', bg: '#D98C7A', fg: '#141312', count: '4.8 · 320 reseñas' },
    { title: 'Frankenstein', author: 'Mary Shelley', bg: '#1F3B4D', fg: '#F3ECE2', count: '4.6 · 115 reseñas' },
    { title: 'El principito', author: 'A. de Saint-Exupéry', bg: '#E9D9BF', fg: '#3A2418', count: '5.0 · 480 reseñas' },
  ]

  // Genres list matching design
  const genres = [
    { name: 'Ficción', letter: 'F', bg: '#E08738', fg: '#141312' },
    { name: 'Ciencia Ficción', letter: 'C', bg: '#1F3B4D', fg: '#F3ECE2' },
    { name: 'Fantasía', letter: 'F', bg: '#3B2C4A', fg: '#F3ECE2' },
    { name: 'Historia', letter: 'H', bg: '#8C5E48', fg: '#F3ECE2' },
    { name: 'Romance', letter: 'R', bg: '#D98C7A', fg: '#141312' },
    { name: 'Misterio', letter: 'M', bg: '#2E2A27', fg: '#F3ECE2' },
    { name: 'Poesía', letter: 'P', bg: '#E9D9BF', fg: '#141312' },
    { name: 'Ensayo', letter: 'E', bg: '#6F7A55', fg: '#F3ECE2' },
  ]

  return (
    <div className="min-h-screen bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text transition-colors duration-300 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section
          id="inicio"
          className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-12"
        >
          {/* Left Column: Headlines & Actions */}
          <div className="flex-1 min-w-0 flex flex-col gap-5 sm:gap-7 text-center lg:text-left">
            <p className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-accent">
              Reseñas escritas por lectores
            </p>
            <h1 className="font-serif font-black text-3xl sm:text-5xl lg:text-[64px] leading-[1.08] tracking-tight text-paper-text dark:text-dark-text">
              Descubre tu próxima lectura a través de ojos apasionados.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-paper-muted dark:text-dark-muted max-w-xl mx-auto lg:mx-0">
              Explora opiniones reales, comparte tus críticas literarias y conecta con una comunidad de lectores.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2 justify-center lg:justify-start">
              <Link
                to="/lista"
                className="bg-accent hover:bg-accent-hover text-[#141312] font-black text-base rounded-full px-7 py-3.5 sm:py-4 flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-98"
              >
                <span>Explorar Reseñas</span>
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <Link
                to="/registro"
                className="border border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface hover:bg-paper-band dark:hover:bg-dark-surface/80 text-paper-text dark:text-dark-text font-bold text-base rounded-full px-7 py-3.5 sm:py-4 flex items-center justify-center transition-all shadow-sm"
              >
                Escribir una Reseña
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Graphic with Organic Blob, Rotated BookCovers & Floating Reviews */}
          <div className="flex-1 min-w-0 w-full relative h-[420px] sm:h-[520px] lg:h-[600px] overflow-hidden sm:overflow-visible">
            {/* SVG Background Organic Shapes */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
            >
              <path
                d="M421 58C520 96 590 200 572 318c-16 112-102 222-228 248C214 592 92 530 44 418-4 306 30 170 120 96 210 22 322 20 421 58Z"
                fill={accentColor}
              />
              <path
                d="M500 420c46 30 70 92 38 132-30 38-96 40-136 14-42-28-44-90-12-124 28-30 74-42 110-22Z"
                fill="#8C5E48"
              />
              <circle
                cx="86"
                cy="92"
                r="26"
                fill={isDark ? '#F3ECE2' : '#8C5E48'}
                opacity={isDark ? '0.9' : '0.4'}
              />
              <path
                d="M60 520c30-20 70-14 88 10"
                stroke={isDark ? '#F3ECE2' : '#8C5E48'}
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Rotated Book 1: Proyecto Hail Mary (Andy Weir) */}
            <div className="absolute left-[6%] sm:left-[12%] top-[8%] sm:top-[12%] z-10 transition-transform duration-500 hover:scale-105">
              <BookCover
                title="Proyecto Hail Mary"
                author="Andy Weir"
                bg="#1F3B4D"
                fg="#F3ECE2"
                size="md"
                rotate={-8}
                interactive={false}
              />
            </div>

            {/* Rotated Book 2: Cien años de soledad (G. García Márquez) */}
            <div className="absolute left-[34%] sm:left-[36%] top-[3%] sm:top-[6%] z-0 transition-transform duration-500 hover:scale-105">
              <BookCover
                title="Cien años de soledad"
                author="G. García Márquez"
                bg="#E9D9BF"
                fg="#3A2418"
                size="md"
                rotate={5}
                interactive={false}
              />
            </div>

            {/* Floating Review Bubble 1: Darly Farias (Cleanly positioned on all devices) */}
            <div
              className="absolute right-[2%] sm:right-[5%] bottom-[5%] sm:bottom-auto sm:top-[30%] w-[260px] sm:w-[300px] max-w-[88%] bg-[#F3ECE2] text-[#241E1A] rounded-2xl p-3.5 sm:p-5 shadow-2xl flex flex-col gap-2 z-20 transition-transform duration-300 hover:scale-102"
              style={{
                boxShadow: isDark
                  ? '0 24px 50px -20px rgba(0,0,0,0.8)'
                  : '0 24px 44px -22px rgba(90,55,30,0.45)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#8C5E48] text-[#F3ECE2] font-black text-[11px] sm:text-xs flex items-center justify-center flex-shrink-0">
                  DF
                </span>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-extrabold text-xs sm:text-sm truncate">
                    darly.lee
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#6B5D52] truncate">
                    sobre Proyecto Hail Mary
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F3B4D] text-[#F3ECE2] flex-shrink-0">
                  Ciencia Ficción
                </span>
              </div>
              <p className="text-xs sm:text-[14px] leading-snug m-0 text-[#241E1A]">
                Lloré por una araña alienígena que habla en acordes. No estaba preparada.
              </p>
              <div className="text-[#B4621C] text-xs sm:text-[13px] tracking-widest" aria-label="5 de 5 estrellas">
                ★★★★★
              </div>
            </div>

            {/* Floating Review Bubble 2: Valeria Ortiz (Hidden on mobile to avoid overlapping, shown on tablet/desktop) */}
            <div
              className="hidden md:flex absolute left-[4%] sm:left-[6%] bottom-[10%] w-[260px] sm:w-[290px] max-w-[78%] bg-[#F3ECE2] text-[#241E1A] rounded-2xl p-4 sm:p-5 shadow-2xl flex-col gap-2.5 z-20 transition-transform duration-300 hover:scale-102"
              style={{
                boxShadow: isDark
                  ? '0 24px 50px -20px rgba(0,0,0,0.8)'
                  : '0 24px 44px -22px rgba(90,55,30,0.45)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[#1F3B4D] text-[#F3ECE2] font-black text-xs flex items-center justify-center flex-shrink-0">
                  VO
                </span>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-extrabold text-[13px] sm:text-sm truncate">
                    vale_lee_historia
                  </span>
                  <span className="text-[11px] text-[#6B5D52] truncate">
                    sobre Sapiens
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8C5E48] text-[#F3ECE2] flex-shrink-0">
                  Historia
                </span>
              </div>
              <p className="text-[13px] sm:text-[14px] leading-snug m-0 text-[#241E1A]">
                Brillante para discutir en sobremesa. Para citar en un ensayo… mejor no.
              </p>
              <div className="text-[#B4621C] text-[13px] tracking-widest" aria-label="4 de 5 estrellas">
                ★★★★☆
              </div>
            </div>

            {/* Pill Badge (Shown on tablet and desktop) */}
            <div className="hidden sm:flex absolute right-[4%] sm:right-[8%] bottom-[2%] sm:bottom-[4%] bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text border border-paper-borderStrong dark:border-dark-borderStrong rounded-full px-4 py-2 text-xs sm:text-[13px] font-bold items-center gap-2 shadow-md z-20">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Fantasía · 4.6 de media esta semana</span>
            </div>
          </div>
        </section>

        {/* GÉNEROS LITERARIOS */}
        <section className="bg-paper-band dark:bg-dark-surface/50 border-y border-paper-border dark:border-dark-border py-14 sm:py-20 transition-colors">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
              <h2 className="font-serif font-black text-2xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-paper-text dark:text-dark-text max-w-2xl">
                Todos los géneros.<br />
                Todas las opiniones.<br />
                <span className="text-accent">Ninguna escrita por un algoritmo.</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-paper-muted dark:text-dark-muted max-w-sm leading-relaxed">
                Filtra por lo que te apetece leer hoy y mira qué piensan quienes ya pasaron por esas páginas.
              </p>
            </div>

            {/* Genres Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {genres.map((g) => (
                <Link
                  key={g.name}
                  to={`/lista?genero=${encodeURIComponent(g.name)}`}
                  className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border hover:border-accent dark:hover:border-accent rounded-2xl p-3 sm:p-3.5 flex items-center gap-3.5 transition-all hover:-translate-y-0.5 group shadow-sm"
                >
                  <span
                    style={{ backgroundColor: g.bg, color: g.fg }}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-serif font-black text-lg sm:text-xl flex-shrink-0 shadow-sm"
                  >
                    {g.letter}
                  </span>
                  <span className="font-bold text-sm sm:text-base text-paper-text dark:text-dark-text flex-1">
                    {g.name}
                  </span>
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
                    className="text-paper-dim dark:text-dark-dim group-hover:text-accent group-hover:translate-x-1 transition-all"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BANDA CLÁSICOS QUE SIGUEN DANDO DE QUÉ HABLAR */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="bg-accent text-[#141312] rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 lg:p-12 relative overflow-hidden flex flex-col gap-6 sm:gap-8 shadow-xl">
            {/* Background decorative blob */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 300"
              className="absolute -right-16 -top-20 w-[300px] sm:w-[340px] h-[300px] sm:h-[340px] pointer-events-none select-none opacity-40 sm:opacity-55"
            >
              <path
                d="M210 30c60 26 92 100 64 162-26 60-104 96-168 72C42 240 8 168 36 104 62 44 150 4 210 30Z"
                fill="#8C5E48"
              />
            </svg>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10">
              <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight max-w-xl">
                Clásicos que siguen dando de qué hablar
              </h2>
              <Link
                to="/lista"
                className="self-start sm:self-auto bg-[#141312] hover:bg-black text-[#F3ECE2] font-bold text-xs sm:text-[15px] rounded-full px-5 sm:px-6 py-2.5 sm:py-3 transition-transform hover:scale-105 active:scale-95 shadow-md"
              >
                Ver debates
              </Link>
            </div>

            {/* Scrollable Books Carousel with Reusable BookCover Component */}
            <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 relative z-10 scrollbar-thin scroll-smooth -mx-2 px-2 sm:mx-0 sm:px-0">
              {classics.map((c) => (
                <div key={c.title} className="flex-shrink-0">
                  <Link
                    to={`/libro/${encodeURIComponent(c.title)}`}
                    className="block text-[#141312]"
                    title={`Ver página y reseñas de "${c.title}"`}
                  >
                    <BookCover
                      title={c.title}
                      author={c.author}
                      bg={c.bg}
                      fg={c.fg}
                      size="md"
                      count={c.count}
                      interactive={true}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ÚLTIMAS CRÍTICAS DE LA COMUNIDAD */}
        <section id="lista" className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-paper-border dark:border-dark-border pb-6">
            <div className="flex flex-col gap-2.5">
              <span className="w-12 sm:w-14 h-1 rounded-full bg-accent" />
              <h2 className="font-serif font-black text-2xl sm:text-4xl tracking-tight text-paper-text dark:text-dark-text">
                Últimas Críticas de la Comunidad
              </h2>
            </div>
            <Link
              to="/lista"
              className="font-bold text-sm sm:text-base text-accent hover:underline flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Ver todas</span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {reviews.map((r, idx) => (
              <ReviewCard
                key={r.id || idx}
                review={r}
                onGenreClick={(selectedGenre) =>
                  navigate(`/lista?genero=${encodeURIComponent(selectedGenre)}`)
                }
              />
            ))}
          </div>
        </section>

        {/* ESTADÍSTICAS */}
        <section className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 sm:py-16 pb-16 sm:pb-24">
          <div className="border border-paper-border dark:border-dark-border bg-paper-card dark:bg-dark-card rounded-3xl grid grid-cols-1 md:grid-cols-3 shadow-card-light dark:shadow-none divide-y md:divide-y-0 md:divide-x divide-paper-border dark:divide-dark-border">
            <div className="p-6 sm:p-10 flex flex-col gap-1 text-center md:text-left">
              <span className="font-serif font-black text-3xl sm:text-5xl text-accent tracking-tight">
                +1,200
              </span>
              <span className="text-sm sm:text-base font-semibold text-paper-muted dark:text-dark-muted">
                Reseñas publicadas
              </span>
            </div>
            <div className="p-6 sm:p-10 flex flex-col gap-1 text-center md:text-left">
              <span className="font-serif font-black text-3xl sm:text-5xl text-paper-text dark:text-dark-text tracking-tight">
                +15
              </span>
              <span className="text-sm sm:text-base font-semibold text-paper-muted dark:text-dark-muted">
                Géneros literarios
              </span>
            </div>
            <div className="p-6 sm:p-10 flex flex-col gap-1 text-center md:text-left">
              <span className="font-serif font-black text-3xl sm:text-5xl text-[#8C5E48] dark:text-[#C9967B] tracking-tight">
                100%
              </span>
              <span className="text-sm sm:text-base font-semibold text-paper-muted dark:text-dark-muted">
                Comunidad libre
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
