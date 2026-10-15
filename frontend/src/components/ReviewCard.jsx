import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookCover from './BookCover'

export default function ReviewCard({
  review,
  onGenreClick,
  className = '',
}) {
  const [showFullModal, setShowFullModal] = useState(false)

  // Standardize field names (support both Spanish backend and template mock keys)
  const title = review.libro || review.title || 'Libro sin título'
  const author = review.autorLibro || review.bookAuthor || review.author || 'Autor desconocido'
  const reviewer = review.nombre || review.user || 'Lector anónimo'
  const genre = review.genero || review.genre || 'Ficción'
  const rating = Number(review.calificacion || review.rating || review.n || 5)
  const description = review.descripcion || review.excerpt || ''
  const date = review.fecha || review.date || 'Reciente'
  const bg = review.bg
  const fg = review.fg

  const starsString = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5 - rating)

  return (
    <>
      <article
        className={`bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-[20px] p-5 sm:p-6 flex flex-col gap-4 shadow-card-light dark:shadow-none hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300 ${className}`}
      >
        {/* Top Header: Reusable Book Cover + Metadata */}
        <div className="flex gap-4 items-start">
          <Link
            to={`/libro/${encodeURIComponent(title)}`}
            title={`Ver ficha completa de "${title}"`}
            className="flex-shrink-0"
          >
            <BookCover
              title={title}
              author={author}
              genre={genre}
              bg={bg}
              fg={fg}
              size="xs"
              interactive={true}
            />
          </Link>

          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            {/* Genre Badge */}
            <button
              type="button"
              onClick={() => onGenreClick && onGenreClick(genre)}
              className="self-start text-[11px] sm:text-[12px] font-bold px-2.5 py-1 rounded-full bg-accent/10 text-accent-dark dark:text-accent border border-accent/25 hover:bg-accent hover:text-[#141312] transition-colors cursor-pointer"
            >
              {genre}
            </button>

            {/* Book Title */}
            <Link
              to={`/libro/${encodeURIComponent(title)}`}
              className="font-serif font-bold text-lg sm:text-[20px] leading-snug text-paper-text dark:text-dark-text truncate cursor-pointer hover:text-accent transition-colors no-underline"
              title={`Ver ficha y reseñas de ${title}`}
            >
              {title}
            </Link>

            {/* Book Author */}
            <span className="text-[13px] text-paper-dim dark:text-dark-dim truncate" title={author}>
              {author}
            </span>

            {/* Star Rating */}
            <div
              className="text-accent text-[14px] tracking-wider"
              aria-label={`${rating} de 5 estrellas`}
              title={`${rating} de 5 estrellas`}
            >
              {starsString}
            </div>
          </div>
        </div>

        {/* Review Excerpt */}
        <p className="text-[14px] sm:text-[15px] leading-relaxed text-paper-body dark:text-dark-body line-clamp-3">
          {description}
        </p>

        {/* Reviewer & Date Meta */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] mt-auto pt-1">
          <span className="flex items-center gap-1.5 text-paper-muted dark:text-dark-muted">
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-75"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
            <span className="font-medium truncate max-w-[130px] sm:max-w-[160px]">
              Por {reviewer}
            </span>
          </span>

          <span className="flex items-center gap-1.5 text-paper-dim dark:text-dark-dim">
            <svg
              aria-hidden="true"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-75"
            >
              <rect x="3.5" y="5" width="17" height="15" rx="2" />
              <path d="M3.5 10h17M8 3v4M16 3v4" />
            </svg>
            <span>{date}</span>
          </span>
        </div>

        {/* Read full review action */}
        <div className="pt-3 border-t border-paper-border dark:border-dark-border flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowFullModal(true)}
            className="flex items-center justify-between w-full font-bold text-[14px] text-paper-text dark:text-dark-text hover:text-accent dark:hover:text-accent transition-colors cursor-pointer group"
          >
            <span>Leer reseña completa</span>
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
              className="text-accent transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </article>

      {/* Full Review Modal */}
      {showFullModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowFullModal(false)}
        >
          <div
            className="bg-paper-surface dark:bg-dark-surface border border-paper-border dark:border-dark-border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-paper-text dark:text-dark-text flex flex-col gap-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowFullModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full border border-paper-border dark:border-dark-border flex items-center justify-center text-paper-muted dark:text-dark-muted hover:text-paper-text dark:hover:text-dark-text transition-colors"
              aria-label="Cerrar ventana"
            >
              ✕
            </button>

            {/* Modal Top with Reusable BookCover at Size SM */}
            <div className="flex gap-4 items-center">
              <BookCover
                title={title}
                author={author}
                genre={genre}
                bg={bg}
                fg={fg}
                size="sm"
              />
              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="self-start text-[12px] font-bold px-3 py-1 rounded-full bg-accent/15 text-accent-dark dark:text-accent border border-accent/30">
                  {genre}
                </span>
                <h3 className="font-serif font-black text-xl sm:text-2xl leading-tight">
                  {title}
                </h3>
                <span className="text-sm text-paper-muted dark:text-dark-muted">
                  por {author}
                </span>
                <div className="text-accent text-base tracking-wider pt-1">
                  {starsString} ({rating}/5)
                </div>
              </div>
            </div>

            {/* Full Review Body */}
            <div className="p-4 rounded-2xl bg-paper-band dark:bg-dark-band/60 border border-paper-border dark:border-dark-border">
              <h4 className="text-xs uppercase tracking-widest font-bold text-accent mb-2">
                Opinión del lector
              </h4>
              <p className="text-[15px] sm:text-base leading-relaxed text-paper-body dark:text-dark-body whitespace-pre-wrap">
                {description}
              </p>
            </div>

            {/* Footer with reviewer details */}
            <div className="flex items-center justify-between text-xs sm:text-sm text-paper-muted dark:text-dark-muted border-t border-paper-border dark:border-dark-border pt-4">
              <span>
                Reseñado por <strong className="text-paper-text dark:text-dark-text">{reviewer}</strong>
              </span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
