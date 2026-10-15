export default function Spinner({ message, text, size = 'md' }) {
  const displayMsg = text || message || 'Cargando reseñas literarias...'
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-14 h-14 border-4',
  }[size] || 'w-10 h-10 border-3'

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated outer ring */}
        <div
          className={`${sizeClasses} rounded-full border-accent/20 border-t-accent animate-spin`}
          style={{ borderTopColor: '#E08738' }}
        />
        {/* Soft inner glow */}
        <div className="absolute w-2 h-2 rounded-full bg-accent/60 animate-ping" />
      </div>

      {displayMsg && (
        <span className="font-sans text-sm sm:text-base font-medium text-paper-muted dark:text-dark-muted animate-pulse">
          {displayMsg}
        </span>
      )}
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
