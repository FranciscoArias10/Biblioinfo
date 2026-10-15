const API_URL = 'http://localhost:5000/registros'
export const API_BASE_URL = API_URL

/**
 * Consulta todas las reseñas registradas en el backend.
 * @param {string} [genero] Filtro opcional por género
 * @returns {Promise<Array>} Listado de reseñas
 */
export async function getReviews(genero) {
  try {
    const url = genero ? `${API_URL}?genero=${encodeURIComponent(genero)}` : API_URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error del servidor (${response.status})`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.reviews || []
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor (Backend en puerto 5000 apagado).')
    }
    console.error('[API getReviews] Error al consultar reseñas:', error)
    throw error
  }
}

/**
 * Envía una nueva reseña literaria al servidor para su persistencia en reviews.json.
 * @param {Object} reviewData Datos de la reseña
 * @returns {Promise<Object>} Reseña guardada confirmada por el servidor
 */
export async function createReview(reviewData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      // El backend devuelve { success: false, message: '...', errors: [...] } con status 400 o 500
      const error = new Error(data.message || 'Error al procesar la reseña en el servidor.')
      error.status = response.status
      error.errors = data.errors || [data.message || 'Error desconocido']
      error.details = error.errors
      throw error
    }

    return data
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      const netError = new Error('No se pudo comunicar con el servidor backend (puerto 5000). ¿Está encendido?')
      netError.details = ['Verifica que hayas ejecutado "npm run dev" en la carpeta backend.']
      throw netError
    }
    console.error('[API createReview] Error al enviar reseña:', error)
    throw error
  }
}
