
/**
 * Paletas de colores dinámicas inspiradas en la identidad de cada género literario.
 * Si el usuario aún no selecciona género, se utiliza la paleta clásica verde oliva.
 */
const GENRE_PALETTES = {
  'Ficción': {
    gradient: 'from-[#5e6f4a] via-[#50603e] to-[#3a472c]',
    accent: '#e6efe0',
    border: 'border-[#7d9365]/30',
  },
  'No Ficción': {
    gradient: 'from-[#3a4f66] via-[#2c3d52] to-[#1a2736]',
    accent: '#dbeafe',
    border: 'border-[#587494]/30',
  },
  'Ciencia Ficción': {
    gradient: 'from-[#115e59] via-[#0f766e] to-[#042f2e]',
    accent: '#ccfbf1',
    border: 'border-[#2dd4bf]/30',
  },
  'Misterio': {
    gradient: 'from-[#3e2b4d] via-[#2e1d3a] to-[#190f21]',
    accent: '#eddcf5',
    border: 'border-[#8e65a6]/30',
  },
  'Fantasía': {
    gradient: 'from-[#581c87] via-[#4c1d95] to-[#240b54]',
    accent: '#f3e8ff',
    border: 'border-[#a855f7]/30',
  },
  'Romance': {
    gradient: 'from-[#831843] via-[#701a3c] to-[#420415]',
    accent: '#fce7f3',
    border: 'border-[#f43f5e]/30',
  },
  'Historia': {
    gradient: 'from-[#78350f] via-[#5c2707] to-[#361502]',
    accent: '#fef3c7',
    border: 'border-[#d97706]/30',
  },
  'Poesía': {
    gradient: 'from-[#7f394c] via-[#662c3c] to-[#3d1722]',
    accent: '#fce7f3',
    border: 'border-[#fb7185]/30',
  },
  'Ensayo': {
    gradient: 'from-[#166534] via-[#14532d] to-[#052e16]',
    accent: '#dcfce7',
    border: 'border-[#22c55e]/30',
  },
  'Desarrollo Personal': {
    gradient: 'from-[#9a5b13] via-[#854d0e] to-[#4d2c05]',
    accent: '#fef3c7',
    border: 'border-[#f59e0b]/30',
  },
}

const DEFAULT_PALETTE = {
  gradient: 'from-[#637250] via-[#536241] to-[#3d492e]',
  accent: '#e6efe0',
  border: 'border-[#819669]/30',
}

/**
 * Componente BookCoverPreview
 * Renderiza una maqueta 3D interactiva de la portada del libro en tiempo real.
 * Actualiza título, autor, género y paleta cromática conforme el usuario digita en el formulario.
 */
export default function BookCoverPreview({
  libro = '',
  autorLibro = '',
  genero = '',
  calificacion = 0,
}) {
  const currentPalette = GENRE_PALETTES[genero] || DEFAULT_PALETTE

  const displayTitle = libro && libro.trim().length > 0 ? libro.trim() : 'Título de tu libro'
  const displayAuthor =
    autorLibro && autorLibro.trim().length > 0
      ? autorLibro.trim().toUpperCase()
      : 'NOMBRE DEL AUT...'

  return (
    <aside
      aria-label="Vista previa de portada generada"
      className="w-full max-w-[340px] bg-paper-surface dark:bg-[#181715] border border-paper-border dark:border-dark-border rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col items-center justify-between gap-6 transition-colors duration-300"
    >
      {/* Título de la tarjeta */}
      <div className="w-full text-center">
        <h3 className="text-xs font-black tracking-widest uppercase text-accent m-0">
          VISTA PREVIA DE TU PORTADA
        </h3>
      </div>

      {/* Maqueta 3D del Libro */}
      <div className="relative group my-2">
        <div
          className={`relative w-[190px] h-[280px] sm:w-[205px] sm:h-[295px] rounded-r-2xl rounded-l-sm bg-gradient-to-br ${currentPalette.gradient} border ${currentPalette.border} shadow-[14px_18px_32px_rgba(0,0,0,0.5),-2px_4px_10px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out flex flex-col justify-between py-6 px-4 select-none overflow-hidden group-hover:scale-[1.02] group-hover:-rotate-1`}
        >
          {/* Sombra y Relieve del Lomo del Libro (Lado Izquierdo) */}
          <div
            className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/55 via-black/20 to-transparent rounded-l-sm pointer-events-none"
            aria-hidden="true"
          />
          {/* Hendidura / Pliegue del lomo */}
          <div
            className="absolute inset-y-0 left-4 w-[1px] bg-black/45 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-[17px] w-[1px] bg-white/15 pointer-events-none"
            aria-hidden="true"
          />

          {/* Brillo en el borde superior y lateral derecho */}
          <div
            className="absolute inset-x-0 top-0 h-[1.5px] bg-white/25 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-white/10 to-transparent rounded-r-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* 1. Autor en la parte superior */}
          <div className="relative z-10 pl-4 pr-1 text-center">
            <span
              title={autorLibro || 'Nombre del autor'}
              className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#f3eedd]/80 uppercase block truncate drop-shadow-xs"
            >
              {displayAuthor}
            </span>
          </div>

          {/* 2. Título en el centro / parte media */}
          <div className="relative z-10 pl-4 pr-1 text-center my-auto">
            <h4
              title={libro || 'Título del libro'}
              className="font-serif font-black text-xl sm:text-2xl text-[#f7f4ea] leading-tight drop-shadow-md line-clamp-3 m-0"
            >
              {displayTitle}
            </h4>
          </div>

          {/* 3. Etiqueta de género o calificación en la base */}
          <div className="relative z-10 pl-4 pr-1 flex flex-col items-center gap-1.5">
            {genero ? (
              <span className="text-[9px] tracking-wider uppercase font-extrabold text-white/90 bg-black/35 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-xs">
                {genero}
              </span>
            ) : (
              <span className="w-8 h-0.5 bg-white/20 rounded-full" />
            )}

            {calificacion > 0 && (
              <div
                className="flex items-center gap-0.5 text-accent text-xs drop-shadow"
                aria-label={`Calificación: ${calificacion} de 5 estrellas`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= calificacion ? 'opacity-100' : 'opacity-25'}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pie descriptivo de la portada */}
      <p className="text-xs sm:text-[13px] text-paper-muted dark:text-dark-muted leading-relaxed text-center max-w-[260px] m-0">
        La portada se genera automáticamente combinando la tipografía clásica con la paleta de tu género.
      </p>
    </aside>
  )
}
