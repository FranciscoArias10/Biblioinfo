import { Link } from 'react-router-dom'

export default function ReviewCard({ review }) {
  const starsString = '★★★★★'.slice(0, review.rating) + '☆☆☆☆☆'.slice(0, 5 - review.rating)

  return (
    <article className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-card-light dark:shadow-none hover:shadow-lg dark:hover:border-dark-borderStrong transition-all duration-300">
      {/* Top Header: Miniature Book Spine + Details */}
      <div className="flex gap-4 items-start">
        {/* Book Spine Miniature */}
        <div
          style={{ backgroundColor: review.spineBg, color: review.spineFg }}
          className="flex-[0_0_68px] sm:flex-[0_0_72px] h-[100px] sm:h-[106px] rounded-r-lg rounded-l-xs p-2 flex items-end font-serif font-black text-[11px] leading-tight border-l-4 border-black/25 shadow-md select-none"
        >
          <span className="line-clamp-3">{review.title}</span>
        </div>

        {/* Book & Review Info */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <span className="self-start text-xs font-bold px-2.5 py-0.5 rounded-full bg-accent/15 text-[#94460F] dark:text-[#EFA868] border border-accent/30">
            {review.genre}
          </span>
          <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight text-paper-text dark:text-dark-text truncate">
            {review.title}
          </h3>
          <span className="text-xs sm:text-sm text-paper-dim dark:text-dark-dim truncate">
            {review.bookAuthor}
          </span>
          <div
            className="text-accent text-sm tracking-wider"
            aria-label={`${review.rating} de 5 estrellas`}
          >
            {starsString}
          </div>
        </div>
      </div>

      {/* Review Excerpt */}
      <p className="text-sm sm:text-base leading-relaxed text-paper-body dark:text-dark-body line-clamp-3 m-0">
        "{review.excerpt}"
      </p>

      {/* Author and Date Meta */}
      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
        <span className="flex items-center gap-1.5 text-paper-muted dark:text-dark-muted font-medium">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
          </svg>
          Por {review.user}
        </span>
        <span className="flex items-center gap-1.5 text-paper-dim dark:text-dark-dim">
          <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="3.5" y="5" width="17" height="15" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" />
          </svg>
          {review.date}
        </span>
      </div>

      {/* Footer Link */}
      <Link
        to={`/lista?id=${review.id}`}
        className="mt-auto pt-3.5 border-t border-paper-border dark:border-dark-border flex items-center justify-between font-bold text-sm text-paper-text dark:text-dark-text hover:text-accent dark:hover:text-accent transition-colors group"
      >
        <span>Leer reseña completa</span>
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent transition-transform group-hover:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </article>
  )
}
