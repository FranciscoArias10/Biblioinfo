import { useState } from 'react'
import { RATING_LABELS } from '../../utils/reviewValidator'

export default function StarRating({
  value = 0,
  onChange,
  error,
  touched,
  disabled = false,
}) {
  const [hoverRating, setHoverRating] = useState(0)
  const activeRating = hoverRating || value
  const hasError = Boolean(error && touched)

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-paper-text dark:text-dark-text">
          Calificación <span className="text-accent">*</span>
        </label>
        <span
          className={`text-xs ${
            activeRating > 0
              ? 'font-bold text-accent'
              : 'font-normal text-paper-muted dark:text-dark-muted italic'
          }`}
        >
          {activeRating > 0 ? (RATING_LABELS[activeRating] || `${activeRating} de 5`) : 'Selecciona una puntuación'}
        </span>
      </div>

      <div
        className={`flex items-center gap-1.5 p-1.5 rounded-xl border transition-colors ${
          hasError
            ? 'border-rose-500 bg-rose-500/5'
            : 'border-transparent'
        }`}
        role="group"
        aria-label="Calificación de 1 a 5 estrellas"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            disabled={disabled}
            className="p-1 focus:outline-none focus:scale-125 transition-transform cursor-pointer"
            aria-label={`${star} estrellas`}
          >
            <svg
              aria-hidden="true"
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                star <= activeRating
                  ? 'text-accent fill-accent'
                  : 'text-paper-borderStrong dark:text-dark-border fill-transparent'
              }`}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
          </button>
        ))}
      </div>

      {hasError && (
        <span className="text-xs text-rose-500 font-medium mt-0.5">{error}</span>
      )}
    </div>
  )
}
