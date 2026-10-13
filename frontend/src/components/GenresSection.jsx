import { Link } from 'react-router-dom'
import { GENRES_DATA } from '../data/landingData'

export default function GenresSection() {
  return (
    <section className="bg-paper-band dark:bg-dark-band border-y border-paper-border dark:border-dark-border transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-6 py-20 sm:py-24 flex flex-col gap-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-tight text-paper-text dark:text-dark-text max-w-2xl">
            Todos los géneros.
            <br />
            Todas las opiniones.
            <br />
            <span className="text-accent">Ninguna escrita por un algoritmo.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-paper-muted dark:text-dark-muted max-w-sm">
            Filtra por lo que te apetece leer hoy y mira qué piensan quienes ya pasaron por esas páginas.
          </p>
        </div>

        {/* Genres Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {GENRES_DATA.map((genre) => (
            <Link
              key={genre.name}
              to={`/lista?genero=${encodeURIComponent(genre.name)}`}
              className="bg-paper-surface dark:bg-dark-bg border border-paper-border dark:border-dark-border rounded-2xl p-3.5 flex items-center gap-3.5 transition-all duration-200 hover:border-accent dark:hover:border-accent hover:shadow-md hover:-translate-y-0.5 group"
            >
              {/* Monogram Badge */}
              <span
                style={{ backgroundColor: genre.bg, color: genre.fg }}
                className="w-13 h-13 rounded-full font-serif font-black text-xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform"
              >
                {genre.letter}
              </span>

              {/* Genre Name */}
              <span className="font-bold text-base text-paper-text dark:text-dark-text flex-1">
                {genre.name}
              </span>

              {/* Chevron Arrow */}
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
                className="text-paper-muted dark:text-dark-dim group-hover:text-accent group-hover:translate-x-1 transition-all"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
