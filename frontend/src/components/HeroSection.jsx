import { Link } from 'react-router-dom'
import { HERO_REVIEWS } from '../data/landingData'

export default function HeroSection() {
  const [review1, review2] = HERO_REVIEWS

  return (
    <section
      id="inicio"
      className="max-w-[1240px] mx-auto px-6 pt-12 pb-20 sm:pt-16 sm:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
    >
      {/* Left Column: Text & CTAs */}
      <div className="flex-1 min-w-0 flex flex-col gap-7">
        <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-accent">
          Reseñas escritas por lectores
        </p>

        <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.08] tracking-tight text-paper-text dark:text-dark-text">
          Descubre tu próxima lectura a través de ojos apasionados.
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed text-paper-muted dark:text-dark-muted max-w-xl">
          Explora opiniones reales, comparte tus críticas literarias y conecta con una comunidad de lectores.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/lista"
            className="bg-accent hover:bg-accent-hover text-[#141312] font-extrabold text-base rounded-full px-7 py-4 flex items-center gap-2.5 shadow-lg shadow-accent/25 transition-all hover:translate-y-[-2px] active:translate-y-0"
          >
            <span>Explorar Reseñas</span>
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <Link
            to="/registro"
            className="border-1.5 border-paper-borderStrong dark:border-dark-borderStrong bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text hover:bg-paper-band dark:hover:bg-dark-surface/80 font-bold text-base rounded-full px-7 py-4 transition-all hover:translate-y-[-2px] active:translate-y-0"
          >
            Escribir una Reseña
          </Link>
        </div>
      </div>

      {/* Right Column: Visual Composition with Books & Reviews */}
      <div className="flex-1 w-full max-w-[560px] lg:max-w-none relative h-[520px] sm:h-[600px]">
        {/* Organic Abstract Background SVG */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
        >
          {/* Main Terracotta Blob */}
          <path
            d="M421 58C520 96 590 200 572 318c-16 112-102 222-228 248C214 592 92 530 44 418-4 306 30 170 120 96 210 22 322 20 421 58Z"
            fill="#E08738"
            className="transition-colors duration-300"
          />
          {/* Accent Warm Brown Shape */}
          <path
            d="M500 420c46 30 70 92 38 132-30 38-96 40-136 14-42-28-44-90-12-124 28-30 74-42 110-22Z"
            fill="#8C5E48"
          />
          <circle
            cx="86"
            cy="92"
            r="26"
            className="fill-paper-brown dark:fill-dark-text opacity-40 dark:opacity-20"
          />
          <path
            d="M60 520c30-20 70-14 88 10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            className="text-paper-brown dark:text-dark-text opacity-30"
          />
        </svg>

        {/* 3D Angled Book 1: Proyecto Hail Mary */}
        <div
          className="absolute left-[10%] top-[12%] w-[135px] sm:w-[155px] h-[200px] sm:h-[225px] rounded-r-xl rounded-l bg-[#1F3B4D] text-[#F3ECE2] -rotate-8 shadow-2xl p-4 flex flex-col justify-between border-l-4 sm:border-l-6 border-black/25 transition-transform duration-300 hover:-rotate-6 hover:scale-105"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-80">
            Andy Weir
          </span>
          <span className="font-serif font-black text-lg sm:text-2xl leading-tight">
            Proyecto Hail Mary
          </span>
        </div>

        {/* 3D Angled Book 2: Cien años de soledad */}
        <div
          className="absolute left-[32%] top-[6%] w-[135px] sm:w-[155px] h-[200px] sm:h-[225px] rounded-r-xl rounded-l bg-[#E9D9BF] text-[#3A2418] rotate-6 shadow-2xl p-4 flex flex-col justify-between border-l-4 sm:border-l-6 border-black/15 transition-transform duration-300 hover:rotate-3 hover:scale-105"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-80 font-medium">
            G. García Márquez
          </span>
          <span className="font-serif font-black text-lg sm:text-2xl leading-tight">
            Cien años de soledad
          </span>
        </div>

        {/* Floating Review Card 1 (Darly) */}
        {review1 && (
          <div className="absolute right-[2%] top-[30%] w-[270px] sm:w-[310px] max-w-[85%] bg-white dark:bg-[#F3ECE2] text-[#241E1A] rounded-2xl p-4 sm:p-4.5 shadow-2xl flex flex-col gap-2.5 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2.5">
              <span
                style={{ backgroundColor: review1.avatarBg, color: review1.avatarFg }}
                className="w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center flex-shrink-0"
              >
                {review1.initials}
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-extrabold text-sm truncate">{review1.user}</span>
                <span className="text-[11px] text-[#6B5D52] truncate">
                  sobre {review1.bookTitle}
                </span>
              </div>
              <span
                style={{ backgroundColor: review1.genreBg, color: review1.genreFg }}
                className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              >
                {review1.genre}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed m-0 text-[#3D352F]">
              "{review1.text}"
            </p>
            <div className="text-[#B4621C] text-sm tracking-wider" aria-label="5 de 5 estrellas">
              ★★★★★
            </div>
          </div>
        )}

        {/* Floating Review Card 2 (Valeria) */}
        {review2 && (
          <div className="absolute left-[3%] bottom-[12%] w-[260px] sm:w-[290px] max-w-[85%] bg-white dark:bg-[#F3ECE2] text-[#241E1A] rounded-2xl p-4 sm:p-4.5 shadow-2xl flex flex-col gap-2.5 transition-transform duration-300 hover:scale-[1.02]">
            <div className="flex items-center gap-2.5">
              <span
                style={{ backgroundColor: review2.avatarBg, color: review2.avatarFg }}
                className="w-8 h-8 rounded-full font-extrabold text-xs flex items-center justify-center flex-shrink-0"
              >
                {review2.initials}
              </span>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-extrabold text-sm truncate">{review2.user}</span>
                <span className="text-[11px] text-[#6B5D52] truncate">
                  sobre {review2.bookTitle}
                </span>
              </div>
              <span
                style={{ backgroundColor: review2.genreBg, color: review2.genreFg }}
                className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
              >
                {review2.genre}
              </span>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed m-0 text-[#3D352F]">
              "{review2.text}"
            </p>
            <div className="text-[#B4621C] text-sm tracking-wider" aria-label="4 de 5 estrellas">
              ★★★★☆
            </div>
          </div>
        )}

        {/* Bottom Pill: Trend Stats */}
        <div className="absolute right-[6%] bottom-[4%] bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text border border-paper-borderStrong dark:border-dark-borderStrong rounded-full px-4 py-2 text-xs sm:text-[13px] font-bold flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Fantasía · 4.6 de media esta semana</span>
        </div>
      </div>
    </section>
  )
}
