const API_BASE_URL = 'http://localhost:5000/registros'

/**
 * Consulta todas las reseñas registradas en el backend.
 * @returns {Promise<Array>} Listado de reseñas
 */
export async function getReviews() {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error del servidor: código ${response.status}`)
    }

    const data = await response.json()
    return Array.isArray(data) ? data : data.reviews || []
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('No se pudo conectar con el servidor (Backend en puerto 5000 apagado).')
    }
    throw error
  }
}

/**
 * Envía una nueva reseña al servidor para su persistencia en reviews.json.
 * @param {Object} reviewData Datos de la reseña
 * @returns {Promise<Object>} Reseña guardada con su ID generado
 */
export async function createReview(reviewData) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      const error = new Error(result.message || 'Error al procesar la reseña en el servidor.')
      error.details = result.errors || []
      error.status = response.status
      throw error
    }

    return result
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      const netError = new Error('No se pudo comunicar con el servidor backend (puerto 5000). ¿Está encendido?')
      netError.details = ['Verifica que hayas ejecutado "npm run dev" en la carpeta backend.']
      throw netError
    }
    throw error
  }
}
