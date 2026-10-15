export default function Spinner({ size = 'md', text = 'Cargando reseñas...' }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-3',
    lg: 'w-12 h-12 border-4',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 select-none" role="status">
      <div
        className={`${
          sizeClasses[size] || sizeClasses.md
        } rounded-full border-accent/20 border-t-accent animate-spin`}
        aria-hidden="true"
      />
      {text && (
        <span className="text-sm font-semibold text-paper-muted dark:text-dark-muted animate-pulse">
          {text}
        </span>
      )}
    </div>
  )
}
