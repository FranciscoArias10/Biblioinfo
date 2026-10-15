import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewForm from '../components/ReviewForm'
import AlertMessage from '../components/AlertMessage'
import { createReview } from '../services/api'

export default function Register() {
  const [searchParams] = useSearchParams()
  const initialBook = searchParams.get('libro') || ''

  const [feedback, setFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [, setCreatedReview] = useState(null)

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await createReview(formData)
      const reviewData = response.review || response.data || response

      setCreatedReview(reviewData)
      setFeedback({
        type: 'success',
        message: `¡Tu reseña de "${formData.libro}" fue registrada exitosamente!`,
        details: [
          'La reseña se ha guardado de forma persistente en el servidor.',
          'Ya puedes consultarla y filtrarla en el catálogo general.',
        ],
      })

      // Scroll hacia arriba para que el usuario vea la alerta de confirmación
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Ocurrió un error inesperado al publicar tu reseña.',
        details: err.details || [],
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismissAlert = () => {
    setFeedback(null)
  }

  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col gap-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-accent tracking-wider uppercase">
          <Link to="/" className="hover:underline">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-paper-muted dark:text-dark-muted">Publicar</span>
        </div>

        {/* Encabezado de la Página */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 self-center sm:self-start">
            <span className="w-10 h-1 rounded-full bg-accent" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-accent">
              Nueva Publicación
            </span>
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-paper-text dark:text-dark-text m-0">
            Escribir una Reseña Literaria
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-paper-muted dark:text-dark-muted max-w-2xl m-0">
            Comparte tu perspectiva crítica y honesta sobre cualquier libro que hayas leído. Tu opinión ayudará a otros lectores de la comunidad a encontrar su próxima aventura.
          </p>
        </div>

        {/* Notificación de Éxito / Error */}
        {feedback && (
          <div className="flex flex-col gap-4">
            <AlertMessage
              type={feedback.type}
              message={feedback.message}
              details={feedback.details}
              onClose={handleDismissAlert}
            />

            {feedback.type === 'success' && (
              <div className="bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                  ¿Deseas verificar tu reseña publicada en el catálogo?
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    to="/lista"
                    className="bg-accent hover:bg-accent-hover text-[#141312] font-extrabold text-sm rounded-full px-5 py-2.5 transition-all shadow-md"
                  >
                    Ver en Catálogo
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setFeedback(null)
                      setCreatedReview(null)
                    }}
                    className="text-sm font-bold text-paper-muted dark:text-dark-muted hover:text-paper-text dark:hover:text-dark-text px-3 py-2"
                  >
                    Publicar otra reseña
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Formulario Controlado */}
        {(!feedback || feedback.type !== 'success') && (
          <ReviewForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
            initialData={{ libro: initialBook }}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}
