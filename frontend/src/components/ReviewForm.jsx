import { useState } from 'react'
import FormField from './form/FormField'
import StarRating from './form/StarRating'
import BookCoverPreview from './BookCoverPreview'
import { GENRES_OPTIONS, validateField, validateReviewForm } from '../utils/reviewValidator'

export default function ReviewForm({ onSubmit, isSubmitting = false }) {
  const today = new Date().toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    libro: '',
    autorLibro: '',
    nombre: '',
    email: '',
    genero: '',
    fecha: today,
    calificacion: 0,
    descripcion: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedValue = name === 'calificacion' ? Number(value) : value

    setFormData((prev) => ({ ...prev, [name]: updatedValue }))

    if (touched[name]) {
      const errorMsg = validateField(name, updatedValue, today)
      setErrors((prev) => ({ ...prev, [name]: errorMsg }))
    }
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
            <FormField
              label="Título del Libro"
              name="libro"
              value={formData.libro}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.libro}
              touched={touched.libro}
              placeholder="Nombre completo de la obra"
              disabled={isSubmitting}
              hint="ej. Cien años de soledad"
            />

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
              placeholder="ej. Darly Farias"
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
        />
      </div>
    </div>
  )
}
