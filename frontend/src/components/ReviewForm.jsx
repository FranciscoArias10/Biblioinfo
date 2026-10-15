import { useState, useRef, useEffect } from 'react'
import FormField from './form/FormField'
import StarRating from './form/StarRating'
import BookCoverPreview from './BookCoverPreview'
import { GENRES_OPTIONS, validateField, validateReviewForm } from '../utils/reviewValidator'
import { searchBooks } from '../services/bookSearch'
import { getReviews } from '../services/api'
import { getBookPalette } from '../utils/palette'

export default function ReviewForm({
  onSubmit,
  isSubmitting = false,
  initialData = {},
}) {
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    libro: initialData.libro || '',
    autorLibro: initialData.autorLibro || '',
    nombre: initialData.nombre || '',
    email: initialData.email || '',
    genero: initialData.genero || '',
    fecha: initialData.fecha || today,
    calificacion: Number(initialData.calificacion) || 0,
    descripcion: initialData.descripcion || '',
    portada: initialData.portada || null,
    libroId: initialData.libroId || null,
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Estado para la búsqueda y autocompletado (libros locales de la web + Google Books)
  const [localBooks, setLocalBooks] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const searchTimeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  // Carga inicial de todos los libros que ya están registrados en la web
  useEffect(() => {
    let isMounted = true
    async function loadPlatformBooks() {
      try {
        const data = await getReviews()
        if (isMounted && Array.isArray(data)) {
          const map = new Map()
          for (const r of data) {
            const rawTitle = (r.libro || r.title || '').trim()
            if (!rawTitle) continue
            const key = rawTitle.toLowerCase()
            if (!map.has(key)) {
              map.set(key, {
                id: r.libroId || r.id,
                title: rawTitle,
                author: (r.autorLibro || r.author || r.bookAuthor || '').trim(),
                category: r.genero || r.genre || '',
                suggestedGenre: r.genero || r.genre || '',
                cover: r.portada || null,
                source: 'Biblioinfo (En la web)',
                isLocal: true,
              })
            } else {
              const existing = map.get(key)
              if (!existing.cover && r.portada) {
                existing.cover = r.portada
              }
              if (!existing.author && r.autorLibro) {
                existing.author = r.autorLibro.trim()
              }
            }
          }
          setLocalBooks(Array.from(map.values()))
        }
      } catch (err) {
        console.warn('Error precargando libros de la plataforma:', err)
      }
    }
    loadPlatformBooks()
    return () => {
      isMounted = false
    }
  }, [])

  // Cierra el menú desplegable al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedValue = name === 'calificacion' ? Number(value) : value

    setFormData((prev) => ({ ...prev, [name]: updatedValue }))

    if (touched[name]) {
      const errorMsg = validateField(name, updatedValue, today)
      setErrors((prev) => ({ ...prev, [name]: errorMsg }))
    }
  }

  // Manejador específico para el título del libro con búsqueda y autocompletado en Google Books
  const handleLibroChange = (e) => {
    const value = e.target.value

    setFormData((prev) => ({
      ...prev,
      libro: value,
      // Si el usuario vacía el campo, se desvincula la portada previa
      portada: value.trim() ? prev.portada : null,
      libroId: value.trim() ? prev.libroId : null,
    }))

    if (touched.libro) {
      const errorMsg = validateField('libro', value, today)
      setErrors((prev) => ({ ...prev, libro: errorMsg }))
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!value || value.trim().length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      setIsSearching(false)
      return
    }

    // Coincidencias instantáneas en libros ya registrados en nuestra web
    const norm = value.toLowerCase().trim()
    const instantLocal = localBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(norm) ||
        (b.author && b.author.toLowerCase().includes(norm))
    )
    if (instantLocal.length > 0) {
      setSuggestions(instantLocal)
      setShowDropdown(true)
    }

    setIsSearching(true)

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchBooks(value, localBooks)
        setSuggestions(results)
        setShowDropdown(results.length > 0)
      } catch (err) {
        console.error('Error buscando libros:', err)
      } finally {
        setIsSearching(false)
      }
    }, 300)
  }

  // Al seleccionar una coincidencia de la lista, se autocompleta título, autor, portada y género sugerido
  const handleSelectBook = (book) => {
    setFormData((prev) => {
      const next = {
        ...prev,
        libro: book.title,
        autorLibro: book.author || prev.autorLibro,
        portada: book.cover || null,
        libroId: book.id || null,
      }
      if (book.suggestedGenre && !prev.genero) {
        next.genero = book.suggestedGenre
      }
      return next
    })

    setErrors((prev) => ({
      ...prev,
      libro: '',
      autorLibro: book.author ? '' : prev.autorLibro,
      genero: book.suggestedGenre ? '' : prev.genero,
    }))

    setShowDropdown(false)
    setSuggestions([])
  }

  // Permite al usuario quitar la foto de portada y volver al diseño tipográfico
  const handleRemoveCover = () => {
    setFormData((prev) => ({
      ...prev,
      portada: null,
      libroId: null,
    }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const errorMsg = validateField(name, value, today)
    setErrors((prev) => ({ ...prev, [name]: errorMsg }))
  }

  const handleRatingChange = (starValue) => {
    setFormData((prev) => ({ ...prev, calificacion: starValue }))
    setTouched((prev) => ({ ...prev, calificacion: true }))
    setErrors((prev) => ({ ...prev, calificacion: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    setTouched(allTouched)

    const formValidationErrors = validateReviewForm(formData, today)
    setErrors(formValidationErrors)

    if (Object.keys(formValidationErrors).length === 0) {
      onSubmit(formData)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Formulario Controlado Principal */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="lg:col-span-8 bg-paper-surface dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-3xl p-6 sm:p-10 shadow-xl transition-colors duration-300 flex flex-col gap-8"
      >
        {/* Sección 1: Información del Libro */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b border-paper-border dark:border-dark-border pb-3">
            <span className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-sm">
              1
            </span>
            <h2 className="font-serif font-bold text-xl text-paper-text dark:text-dark-text m-0">
              Información del Libro
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Título del Libro con Autocompletado de Google Books */}
            <div className="relative flex flex-col gap-1.5 w-full" ref={dropdownRef}>
              <div className="flex items-center justify-between gap-2 min-h-[22px]">
                <label
                  htmlFor="libro"
                  className="text-sm font-bold text-paper-text dark:text-dark-text truncate flex items-center gap-2"
                >
                  <span>Título del Libro</span>
                  <span className="text-accent">*</span>
                  {formData.portada && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <span>✓</span>
                      <span>Portada vinculada</span>
                    </span>
                  )}
                </label>
                {isSearching ? (
                  <span className="text-xs font-semibold text-accent flex items-center gap-1.5">
                    <svg className="animate-spin h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Buscando libro...</span>
                  </span>
                ) : (
                  <span className="text-xs font-normal text-paper-muted dark:text-dark-muted truncate">
                    ej. Cien años de soledad
                  </span>
                )}
              </div>

              <div className="relative w-full">
                <input
                  type="text"
                  id="libro"
                  name="libro"
                  value={formData.libro}
                  onChange={handleLibroChange}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowDropdown(true)
                  }}
                  onBlur={handleBlur}
                  placeholder="Escribe el nombre del libro para buscar coincidencias..."
                  disabled={isSubmitting}
                  autoComplete="off"
                  className={`w-full px-4 py-3 rounded-xl bg-paper-bg dark:bg-dark-bg border text-paper-text dark:text-dark-text placeholder:text-paper-muted/60 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.libro && touched.libro
                      ? 'border-rose-500 focus:ring-rose-500/20'
                      : 'border-paper-borderStrong dark:border-dark-border focus:border-accent focus:ring-accent/20'
                  }`}
                />

                {/* Menú desplegable con coincidencias de Google Books */}
                {showDropdown && suggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+6px)] left-0 right-0 z-50 bg-paper-surface dark:bg-dark-card border border-paper-borderStrong dark:border-dark-border rounded-2xl shadow-2xl overflow-hidden max-h-[360px] overflow-y-auto">
                    <div className="p-2.5 bg-paper-band dark:bg-dark-surface/80 border-b border-paper-border dark:border-dark-border flex items-center justify-between text-xs font-bold text-paper-muted dark:text-dark-muted">
                      <span>Coincidencias encontradas (haz clic para autocompletar)</span>
                      <button
                        type="button"
                        onClick={() => setShowDropdown(false)}
                        className="text-paper-muted hover:text-paper-text text-sm px-1.5 cursor-pointer"
                        title="Cerrar sugerencias"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="divide-y divide-paper-border dark:divide-dark-border">
                      {suggestions.map((item, idx) => {
                        const palette = getBookPalette(item.title, item.suggestedGenre)
                        return (
                          <button
                            key={item.id || idx}
                            type="button"
                            onClick={() => handleSelectBook(item)}
                            className="w-full p-3 flex items-center gap-3.5 hover:bg-accent/10 dark:hover:bg-accent/10 transition-colors text-left cursor-pointer group"
                          >
                            {/* Miniatura de portada (foto oficial o portada estilizada con paleta de color) */}
                            <div className="w-10 h-14 rounded-md bg-paper-band dark:bg-dark-surface flex-shrink-0 overflow-hidden border border-paper-border dark:border-dark-border flex items-center justify-center shadow-xs">
                              {item.cover ? (
                                <img
                                  src={item.cover}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div
                                  style={{ backgroundColor: palette.bg, color: palette.fg }}
                                  className="w-full h-full flex flex-col justify-between p-1 select-none text-[8px] font-bold border-l-2 border-black/25"
                                  title="Libro registrado en la web con portada tipográfica"
                                >
                                  <span className="text-[9px] opacity-75">📖</span>
                                  <span className="line-clamp-2 text-[7px] leading-tight font-serif break-words">
                                    {item.title}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Datos del libro */}
                            <div className="flex flex-col min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-serif font-black text-sm text-paper-text dark:text-dark-text truncate group-hover:text-accent transition-colors">
                                  {item.title}
                                </span>
                                {item.isLocal && (
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-accent/20 text-accent-dark dark:text-accent border border-accent/30 flex-shrink-0">
                                    En la web
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-paper-muted dark:text-dark-muted truncate">
                                {item.author ? `Por ${item.author}` : 'Autor no especificado'}
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                {item.suggestedGenre && (
                                  <span className="inline-block text-[10px] font-bold text-accent">
                                    {item.suggestedGenre}
                                  </span>
                                )}
                                {item.isLocal && !item.cover && (
                                  <span className="text-[10px] text-paper-muted/80 dark:text-dark-muted/70">
                                    · Sin portada fotográfica
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex-shrink-0 text-accent font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              <span>Autocompletar</span>
                              <span>→</span>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="p-2.5 bg-paper-band/50 dark:bg-dark-surface/40 text-[11px] text-paper-muted dark:text-dark-muted text-center border-t border-paper-border dark:border-dark-border">
                      ¿No está en la lista? Puedes escribir el nombre y autor a mano normalmente.
                    </div>
                  </div>
                )}
              </div>

              {errors.libro && touched.libro && (
                <span className="text-xs text-rose-500 font-medium mt-0.5 leading-snug">
                  {errors.libro}
                </span>
              )}
            </div>

            <FormField
              label="Autor de la Obra"
              name="autorLibro"
              value={formData.autorLibro}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.autorLibro}
              touched={touched.autorLibro}
              placeholder="Escritor o escritora"
              disabled={isSubmitting}
              hint="ej. Gabriel García Márquez"
            />

            {/* Selector de Género */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="genero" className="text-sm font-bold text-paper-text dark:text-dark-text">
                Género Literario <span className="text-accent">*</span>
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 rounded-xl bg-paper-bg dark:bg-dark-bg border text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 transition-all ${
                  errors.genero && touched.genero
                    ? 'border-rose-500 focus:ring-rose-500/20'
                    : 'border-paper-borderStrong dark:border-dark-border focus:border-accent focus:ring-accent/20'
                }`}
              >
                <option value="" disabled>Selecciona un género...</option>
                {GENRES_OPTIONS.map((g) => (
                  <option key={g} value={g} className="bg-paper-surface dark:bg-dark-card text-paper-text dark:text-dark-text">
                    {g}
                  </option>
                ))}
              </select>
              {errors.genero && touched.genero && (
                <span className="text-xs text-rose-500 font-medium mt-0.5">{errors.genero}</span>
              )}
            </div>

            {/* Selector de Estrellas */}
            <StarRating
              value={formData.calificacion}
              onChange={handleRatingChange}
              error={errors.calificacion}
              touched={touched.calificacion}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Sección 2: Datos del Lector y Fecha */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b border-paper-border dark:border-dark-border pb-3">
            <span className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-sm">
              2
            </span>
            <h2 className="font-serif font-bold text-xl text-paper-text dark:text-dark-text m-0">
              Datos del Lector y Fecha
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            <FormField
              label="Tu Nombre / Apodo"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nombre}
              touched={touched.nombre}
              placeholder="ej. Tu Nombre / Apodo"
              disabled={isSubmitting}
            />

            <FormField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="ejemplo@correo.com"
              disabled={isSubmitting}
            />

            <FormField
              label="Fecha de Lectura"
              name="fecha"
              type="date"
              max={today}
              value={formData.fecha}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.fecha}
              touched={touched.fecha}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Sección 3: Crítica Literaria */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3 border-b border-paper-border dark:border-dark-border pb-3">
            <span className="w-8 h-8 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-sm">
              3
            </span>
            <h2 className="font-serif font-bold text-xl text-paper-text dark:text-dark-text m-0">
              Crítica Literaria
            </h2>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="descripcion" className="text-sm font-bold text-paper-text dark:text-dark-text">
                Tu Opinión sobre el Libro <span className="text-accent">*</span>
              </label>
              <span
                className={`text-xs ${
                  formData.descripcion.trim().length >= 10
                    ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                    : 'text-paper-muted dark:text-dark-muted'
                }`}
              >
                {formData.descripcion.trim().length} / 10 caracteres mín.
              </span>
            </div>

            <textarea
              id="descripcion"
              name="descripcion"
              rows="5"
              value={formData.descripcion}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Comparte tus impresiones, el impacto de los personajes, el estilo del autor o por qué recomiendas esta lectura..."
              disabled={isSubmitting}
              className={`w-full px-4 py-3 rounded-2xl bg-paper-bg dark:bg-dark-bg border text-paper-text dark:text-dark-text placeholder:text-paper-muted/60 dark:placeholder:text-dark-muted/50 focus:outline-none focus:ring-2 transition-all resize-y ${
                errors.descripcion && touched.descripcion
                  ? 'border-rose-500 focus:ring-rose-500/20'
                  : 'border-paper-borderStrong dark:border-dark-border focus:border-accent focus:ring-accent/20'
              }`}
            />
            {errors.descripcion && touched.descripcion && (
              <span className="text-xs text-rose-500 font-medium mt-0.5">{errors.descripcion}</span>
            )}
          </div>
        </div>

        {/* Botón de Envío */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-paper-border dark:border-dark-border">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-[#141312] font-black text-base rounded-full px-9 py-4 flex items-center justify-center gap-3 transition-all shadow-lg shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-[#141312]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Publicando reseña...</span>
              </>
            ) : (
              <>
                <span>Publicar Reseña Ahora</span>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Columna Lateral con Vista Previa 3D en Vivo */}
      <div className="lg:col-span-4 lg:sticky lg:top-24 w-full flex justify-center">
        <BookCoverPreview
          libro={formData.libro}
          autorLibro={formData.autorLibro}
          genero={formData.genero}
          calificacion={formData.calificacion}
          portada={formData.portada}
          onRemoveCover={handleRemoveCover}
        />
      </div>
    </div>
  )
}
