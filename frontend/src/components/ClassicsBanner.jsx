import { Link } from 'react-router-dom'
import { CLASSICS_DATA } from '../data/landingData'

export default function ClassicsBanner() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-16 sm:pt-20 pb-8">
      <div className="bg-accent text-[#141312] rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col gap-8 shadow-xl">
        {/* Background decorative SVG blob */}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 300"
          className="absolute right-[-60px] top-[-80px] w-80 h-80 pointer-events-none select-none"
        >
          <path
            d="M210 30c60 26 92 100 64 162-26 60-104 96-168 72C42 240 8 168 36 104 62 44 150 4 210 30Z"
            fill="#8C5E48"
            opacity="0.55"
          />
        </svg>

        {/* Banner Header */}
        <div className="flex flex-wrap items-end justify-between gap-5 relative z-10">
          <h2 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight max-w-xl">
            Clásicos que siguen dando de qué hablar
          </h2>
          <Link
            to="/lista"
            className="bg-[#141312] hover:bg-[#252220] active:scale-95 text-[#F3ECE2] font-bold text-sm sm:text-base rounded-full px-6 py-3 transition-all"
          >
            Ver debates
          </Link>
        </div>

        {/* Horizontal Scrollable Book Showcase */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 relative z-10 no-scrollbar">
          {CLASSICS_DATA.map((book) => (
            <Link
              key={book.title}
              to={`/lista?buscar=${encodeURIComponent(book.title)}`}
              className="flex-[0_0_145px] sm:flex-[0_0_155px] flex flex-col gap-2.5 text-[#141312] group"
            >
              {/* Book Spine / Cover Card */}
              <div
                style={{ backgroundColor: book.bg, color: book.fg }}
                className="h-[215px] sm:h-[225px] rounded-r-xl rounded-l-md p-4 flex flex-col justify-between border-l-6 border-black/25 shadow-book transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl"
              >
                <span className="text-[10px] tracking-widest uppercase opacity-85 font-semibold truncate">
                  {{ author: book.author }.author}
                </span>
                <span className="font-serif font-black text-lg sm:text-xl leading-tight">
                  {book.title}
                </span>
              </div>

              {/* Review Count Badge */}
              <span className="text-xs sm:text-sm font-bold opacity-90 pl-1">
                {book.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
