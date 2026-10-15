import { useState } from 'react'

const GENRES = [
  'Ficción',
  'Ciencia Ficción',
  'Fantasía',
  'Historia',
  'Romance',
  'Misterio',
  'Poesía',
  'Ensayo',
  'Desarrollo Personal',
  'No Ficción',
]

export default function ReviewForm({ onSubmit, isSubmitting = false }) {
  // Fecha de hoy por defecto en formato YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    libro: '',
    autorLibro: '',
    nombre: '',
    email: '',
    genero: '',
    fecha: todayStr,
    calificacion: 5,
    descripcion: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateField = (name, value) => {
    let error = ''
    switch (name) {
      case 'libro':
        if (!value || value.trim().length < 2) {
          error = 'El título del libro es obligatorio (mínimo 2 letras).'
        }
        break
      case 'autorLibro':
        if (!value || value.trim().length < 2) {
          error = 'El autor del libro es obligatorio (mínimo 2 letras).'
        }
        break
      case 'nombre':
        if (!value || value.trim().length < 2) {
          error = 'Tu nombre como autor de la reseña es obligatorio.'
        }
        break
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value || !emailRegex.test(value.trim())) {
          error = 'Ingresa un correo electrónico válido (ejemplo: usuario@correo.com).'
        }
        break
      }
      case 'genero':
        if (!value || value.trim() === '') {
          error = 'Debes seleccionar un género literario.'
        }
        break
      case 'fecha': {
        if (!value) {
          error = 'La fecha de la reseña es obligatoria.'
        } else {
          const selected = new Date(value)
          const today = new Date()
          today.setHours(23, 59, 59, 999)
          if (selected > today) {
            error = 'La fecha de la reseña no puede ser futura.'
          }
        }
        break
      }
      case 'calificacion': {
        const num = Number(value)
        if (isNaN(num) || num < 1 || num > 5) {
          error = 'La calificación debe ser entre 1 y 5 estrellas.'
        }
        break
      }
      case 'descripcion':
        if (!value || value.trim().length < 10) {
          error = 'La reseña debe contener una descripción de al menos 10 caracteres.'
        }
        break
      default:
        break
    }
    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar todos los campos
    const newErrors = {}
    const newTouched = {}
    Object.keys(formData).forEach((key) => {
      newTouched[key] = true
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    setTouched(newTouched)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-paper-card dark:bg-dark-card border border-paper-border dark:border-dark-border rounded-2xl p-6 sm:p-8 shadow-card-light dark:shadow-none space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Título del Libro */}
        <div className="sm:col-span-1">
          <label
            htmlFor="libro"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Título del Libro *
          </label>
          <input
            id="libro"
            name="libro"
            type="text"
            placeholder="Ej: Cien años de soledad"
            value={formData.libro}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.libro
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          {errors.libro && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.libro}</p>
          )}
        </div>

        {/* Autor del Libro */}
        <div className="sm:col-span-1">
          <label
            htmlFor="autorLibro"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Autor del Libro *
          </label>
          <input
            id="autorLibro"
            name="autorLibro"
            type="text"
            placeholder="Ej: Gabriel García Márquez"
            value={formData.autorLibro}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.autorLibro
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          {errors.autorLibro && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.autorLibro}</p>
          )}
        </div>

        {/* Nombre del Reseñador */}
        <div className="sm:col-span-1">
          <label
            htmlFor="nombre"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Tu Nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej: Carlos Gómez"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.nombre
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          {errors.nombre && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.nombre}</p>
          )}
        </div>

        {/* Correo Electrónico */}
        <div className="sm:col-span-1">
          <label
            htmlFor="email"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Correo Electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="carlos.gomez@correo.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Género Literario */}
        <div className="sm:col-span-1">
          <label
            htmlFor="genero"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Género Literario *
          </label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.genero
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          >
            <option value="">Selecciona un género...</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.genero && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.genero}</p>
          )}
        </div>

        {/* Fecha de la Reseña */}
        <div className="sm:col-span-1">
          <label
            htmlFor="fecha"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Fecha de la Reseña *
          </label>
          <input
            id="fecha"
            name="fecha"
            type="date"
            max={todayStr}
            value={formData.fecha}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 ${
              errors.fecha
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          {errors.fecha && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fecha}</p>
          )}
        </div>

        {/* Calificación (1 a 5 estrellas) */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-2">
            Calificación: {formData.calificacion} de 5 Estrellas *
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, calificacion: star }))
                  setErrors((prev) => ({ ...prev, calificacion: '' }))
                }}
                disabled={isSubmitting}
                className="text-2xl sm:text-3xl transition-transform hover:scale-110 focus:outline-none"
                aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
              >
                <span className={star <= Number(formData.calificacion) ? 'text-accent' : 'text-stone-300 dark:text-stone-600'}>
                  ★
                </span>
              </button>
            ))}
          </div>
          {errors.calificacion && (
            <p className="mt-1 text-xs text-rose-500 font-medium">{errors.calificacion}</p>
          )}
        </div>

        {/* Descripción / Contenido */}
        <div className="sm:col-span-2">
          <label
            htmlFor="descripcion"
            className="block text-xs font-bold uppercase tracking-wider text-paper-muted dark:text-dark-muted mb-1.5"
          >
            Descripción / Crítica Literaria * (mínimo 10 caracteres)
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            placeholder="Escribe tu opinión crítica fundamentada sobre la trama, personajes y estilo del libro..."
            value={formData.descripcion}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isSubmitting}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-colors bg-paper-surface dark:bg-dark-surface text-paper-text dark:text-dark-text focus:outline-none focus:ring-2 resize-y ${
              errors.descripcion
                ? 'border-rose-500 focus:ring-rose-400'
                : 'border-paper-border dark:border-dark-border focus:ring-accent/50 focus:border-accent'
            }`}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.descripcion ? (
              <p className="text-xs text-rose-500 font-medium">{errors.descripcion}</p>
            ) : (
              <span />
            )}
            <span className="text-[11px] text-paper-dim dark:text-dark-dim">
              {formData.descripcion.length} caracteres
            </span>
          </div>
        </div>
      </div>

      {/* Botón de Envío */}
      <div className="pt-3 border-t border-paper-border dark:border-dark-border flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 shadow-md ${
            isSubmitting
              ? 'bg-accent/60 cursor-not-allowed text-[#141312]'
              : 'bg-accent hover:bg-accent-hover text-[#141312] hover:shadow-lg active:scale-95'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#141312]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Guardando en servidor...
            </>
          ) : (
            'Publicar Reseña'
          )}
        </button>
      </div>
    </form>
  )
}
