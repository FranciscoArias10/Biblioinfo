export default function AlertMessage({ type = 'error', message, details = [], onClose }) {
  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      className={`w-full rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 border transition-all duration-300 shadow-sm ${
        isSuccess
          ? 'bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border-emerald-500/30'
          : 'bg-rose-500/10 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200 border-rose-500/30'
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-rose-600 dark:text-rose-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        )}
      </div>

      {/* Message and details */}
      <div className="flex-1 text-sm sm:text-[15px] leading-relaxed">
        <p className="font-bold m-0">{message}</p>
        {details && details.length > 0 && (
          <ul className="mt-2 list-disc list-inside space-y-1 text-xs sm:text-sm opacity-90 pl-1">
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Close button if provided */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificación"
          className="flex-shrink-0 text-current opacity-70 hover:opacity-100 p-1 rounded-lg transition-opacity"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
