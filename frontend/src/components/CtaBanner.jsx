import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section id="registro" className="max-w-[1240px] mx-auto px-6 pb-20 sm:pb-24">
      <div className="bg-[#2A1E18] text-[#F3ECE2] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* Decorative Background Vector */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 300"
          className="absolute right-[-40px] bottom-[-90px] w-[360px] sm:w-[460px] h-[280px] sm:h-[340px] pointer-events-none select-none"
        >
          <path
            d="M300 40c70 30 110 110 80 180-30 66-120 90-200 70C100 270 30 210 40 140 50 64 140 16 210 22c32 3 62 8 90 18Z"
            fill="#8C5E48"
            opacity="0.5"
          />
          <path
            d="M120 180c40-60 120-80 180-40"
            stroke="#E08738"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Heading */}
        <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-tight max-w-2xl relative z-10 text-center md:text-left">
          ¿Leíste un buen libro recientemente?{' '}
          <span className="text-accent">Cuéntale al mundo qué te pareció.</span>
        </h2>

        {/* Action Button */}
        <Link
          to="/registro"
          className="relative z-10 bg-[#F3ECE2] hover:bg-white active:scale-95 text-[#141312] font-extrabold text-base rounded-full px-8 py-4 flex items-center gap-2.5 transition-all shadow-xl flex-shrink-0"
        >
          <span>Escribir Reseña Ahora</span>
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
      </div>
    </section>
  )
}
