import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReviewForm from '../components/ReviewForm'
import AlertMessage from '../components/AlertMessage'
import { createReview } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdReview, setCreatedReview] = useState(null)

  const handleSubmit = async (formData) => {
    setIsSubmitting(true)
    setFeedback(null)
    setCreatedReview(null)

    try {
      const response = await createReview(formData)
      setCreatedReview(response.data || response.review || formData)
      setFeedback({
        type: 'success',
        message: '¡Reseña registrada exitosamente!',
        details: [
          `Obra: "${formData.libro}" por ${formData.autorLibro}`,
          'Los datos fueron guardados y persistidos en el servidor.',
        ],
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Ocurrió un error al registrar la reseña',
        details: error.details || error.errors || ['Verifica que el servidor backend esté activo en http://localhost:5000'],
      })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-paper-bg dark:bg-dark-bg text-paper-text dark:text-dark-text min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-[860px] w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-1 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              Nueva Publicación
            </span>
            <span className="w-8 h-1 rounded-full bg-accent" />
          </div>
          <h1 className="font-serif font-black text-3xl sm:text-4xl text-paper-text dark:text-dark-text mb-3">
            Compartir una Reseña Literaria
          </h1>
          <p className="text-paper-muted dark:text-dark-muted max-w-lg mx-auto text-sm sm:text-base">
            Contribuye al catálogo de BookVerse. Tus reseñas se almacenan de forma persistente en el servidor de la comunidad.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="mb-6">
            <AlertMessage
              type={feedback.type}
              message={feedback.message}
              details={feedback.details}
              onClose={() => setFeedback(null)}
            />
            {feedback.type === 'success' && (
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                <Link
                  to="/lista"
                  className="bg-accent hover:bg-accent-hover text-[#141312] font-bold px-6 py-2.5 rounded-full text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Ver Catálogo de Reseñas</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setFeedback(null)
                    setCreatedReview(null)
                  }}
                  className="border border-paper-border dark:border-dark-border hover:bg-paper-surface dark:hover:bg-dark-surface px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
                >
                  Escribir otra reseña
                </button>
              </div>
            )}
          </div>
        )}

        {/* Formulario */}
        <ReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>

      <Footer />
    </div>
  )
}
