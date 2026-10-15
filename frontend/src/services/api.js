/**
 * Centralized API service for Biblioinfo
 * Connects with Express Backend at http://localhost:5000/registros
 */

const API_URL = 'http://localhost:5000/registros'
export const API_BASE_URL = API_URL
export { API_URL }

// Initial fallback reviews ensuring the UI always has rich, beautiful content
export const INITIAL_REVIEWS = [
  {
    id: '9d51fd3d-d42f-4729-818a-57648e8c7f95',
    libro: 'El Nombre de la Rosa',
    autorLibro: 'Umberto Eco',
    nombre: 'Mateo Silva',
    email: 'mateo.silva@correo.com',
    genero: 'Misterio',
    fecha: '2026-10-12',
    calificacion: 5,
    descripcion: 'Una apasionante novela de misterio eclesiástico en una abadía benedictina del siglo XIV.',
    createdAt: '2026-10-13T00:46:41.486Z',
  },
  {
    id: 'e4b2a8d3-52f1-4c28-98e6-7649d6824901',
    libro: 'Cien años de soledad',
    autorLibro: 'Gabriel García Márquez',
    nombre: 'Ana Morales',
    email: 'ana.morales@example.com',
    genero: 'Ficción',
    fecha: '2026-10-10',
    calificacion: 5,
    descripcion: 'Una obra cumbre de la literatura universal que retrata con maestría el realismo mágico a través de la estirpe Buendía.',
    createdAt: '2026-10-10T14:20:00.000Z',
  },
  {
    id: '7f8b1c4e-9d2a-4835-b1e7-a9f3458c2198',
    libro: 'Hábitos Atómicos',
    autorLibro: 'James Clear',
    nombre: 'Roberto Vargas',
    email: 'roberto.vargas@example.com',
    genero: 'Ensayo',
    fecha: '2026-10-11',
    calificacion: 5,
    descripcion: 'Estrategias prácticas y fundamentadas en psicología para construir hábitos sostenibles y eliminar rutinas improductivas.',
    createdAt: '2026-10-11T09:30:00.000Z',
  },
  {
    id: 'rev-hail-mary',
    libro: 'Proyecto Hail Mary',
    autorLibro: 'Andy Weir',
    nombre: 'Darly Farias',
    email: 'darly.lee@example.com',
    genero: 'Ciencia Ficción',
    fecha: '2026-10-12',
    calificacion: 5,
    descripcion: 'Empieza como un misterio de laboratorio y termina siendo una de las amistades más tiernas que he leído. La ciencia se explica sin pedantería y cada capítulo deja una pregunta abierta que te obliga a seguir.',
    createdAt: '2026-10-12T18:00:00.000Z',
  },
  {
    id: 'rev-sapiens',
    libro: 'Sapiens',
    autorLibro: 'Yuval Noah Harari',
    nombre: 'Valeria Ortiz',
    email: 'valeria.ortiz@example.com',
    genero: 'Historia',
    fecha: '2026-10-08',
    calificacion: 4,
    descripcion: 'Brillante como provocación, discutible como historia. Harari conecta ideas con una facilidad envidiable, aunque a veces simplifica debates académicos que siguen muy abiertos.',
    createdAt: '2026-10-08T11:15:00.000Z',
  },
  {
    id: 'rev-viento',
    libro: 'El nombre del viento',
    autorLibro: 'Patrick Rothfuss',
    nombre: 'Andrés Molina',
    email: 'andres.m@example.com',
    genero: 'Fantasía',
    fecha: '2026-10-05',
    calificacion: 4,
    descripcion: 'La prosa es pura música y Kvothe es tan insoportable como fascinante. Le resto una estrella por la eterna espera de la tercera parte, que ya es casi un género propio.',
    createdAt: '2026-10-05T16:45:00.000Z',
  },
  {
    id: 'rev-1984',
    libro: '1984',
    autorLibro: 'George Orwell',
    nombre: 'Camila Reyes',
    email: 'camila.r@example.com',
    genero: 'Ficción',
    fecha: '2026-10-03',
    calificacion: 5,
    descripcion: 'Incómodo en el mejor sentido. Lo leí con el móvil al lado y no pude dejar de pensar en cuánto de la neolengua ya usamos sin darnos cuenta.',
    createdAt: '2026-10-03T20:10:00.000Z',
  },
  {
    id: 'rev-paramo',
    libro: 'Pedro Páramo',
    autorLibro: 'Juan Rulfo',
    nombre: 'Luis Herrera',
    email: 'luis.herrera@example.com',
    genero: 'Clásico',
    fecha: '2026-10-01',
    calificacion: 4,
    descripcion: 'Corto pero exigente: las voces se mezclan y los muertos hablan. Mi consejo es leerlo de una sentada y en voz baja, como si alguien más estuviera escuchando.',
    createdAt: '2026-10-01T15:20:00.000Z',
  },
  {
    id: 'rev-dune',
    libro: 'Dune',
    autorLibro: 'Frank Herbert',
    nombre: 'Elena Castro',
    email: 'elena.c@example.com',
    genero: 'Ciencia Ficción',
    fecha: '2026-10-09',
    calificacion: 5,
    descripcion: 'Monumental construcción de mundo. La ecología de Arrakis, la política y la religión se entrelazan de una forma que aún no ha sido superada.',
    createdAt: '2026-10-09T13:00:00.000Z',
  },
  {
    id: 'rev-soledad-2',
    libro: 'Cien años de soledad',
    autorLibro: 'Gabriel García Márquez',
    nombre: 'Carlos Mendoza',
    email: 'carlos.m@example.com',
    genero: 'Ficción',
    fecha: '2026-10-07',
    calificacion: 4,
    descripcion: 'Una prosa deslumbrante, aunque el ritmo en la segunda mitad puede volverse denso para quienes no acostumbran la repetición cíclica de nombres.',
    createdAt: '2026-10-07T17:30:00.000Z',
  },
  {
    id: 'rev-sombra',
    libro: 'La sombra del viento',
    autorLibro: 'Carlos Ruiz Zafón',
    nombre: 'Sofía Navarro',
    email: 'sofia.n@example.com',
    genero: 'Misterio',
    fecha: '2026-10-06',
    calificacion: 5,
    descripcion: 'El Cementerio de los Libros Olvidados es el sueño de cualquier amante de la literatura. Una carta de amor a los libros envuelta en un misterio gótico fascinante.',
    createdAt: '2026-10-06T19:20:00.000Z',
  },
  {
    id: 'rev-principito',
    libro: 'El principito',
    autorLibro: 'Antoine de Saint-Exupéry',
    nombre: 'Lucía Benítez',
    email: 'lucia.b@example.com',
    genero: 'Clásico',
    fecha: '2026-10-04',
    calificacion: 5,
    descripcion: 'Lo esencial es invisible a los ojos. Cada relectura revela una capa distinta que te interpela según el momento de tu vida.',
    createdAt: '2026-10-04T12:00:00.000Z',
  },
]

/**
 * Consulta todas las reseñas registradas en el backend (con filtro opcional de género).
 * @param {string} [genero] Filtro opcional por género
 * @returns {Promise<Array>} Listado de reseñas
 */
export async function getReviews(genero = '') {
  try {
    const url = genero
      ? `${API_URL}?genero=${encodeURIComponent(genero)}`
      : API_URL

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error del servidor (${response.status})`)
    }

    const data = await response.json()
    const list = Array.isArray(data) ? data : data.reviews || []
    if (list.length > 0) {
      return list
    }

    // Si el backend aún no tiene registros, proveemos las reseñas iniciales
    return genero
      ? INITIAL_REVIEWS.filter(
          (r) => r.genero.toLowerCase() === genero.toLowerCase()
        )
      : INITIAL_REVIEWS
  } catch (error) {
    console.warn('[api.js] Backend no alcanzable o en espera, usando datos locales:', error.message)
    const local = localStorage.getItem('biblioinfo_cached_reviews')
    const pool = local ? JSON.parse(local) : INITIAL_REVIEWS

    if (genero) {
      return pool.filter((r) => r.genero.toLowerCase() === genero.toLowerCase())
    }
    return pool
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
        Accept: 'application/json',
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

    // Cache locally as well for offline/fallback resilience
    try {
      const local = localStorage.getItem('biblioinfo_cached_reviews')
      const pool = local ? JSON.parse(local) : [...INITIAL_REVIEWS]
      const savedReview = data.review || data.data || reviewData
      pool.unshift(savedReview)
      localStorage.setItem('biblioinfo_cached_reviews', JSON.stringify(pool))
    } catch {
      // Ignore localStorage quotas
    }

    return data
  } catch (error) {
    if (error.status) {
      // Re-throw API validation errors so ReviewForm displays them
      throw error
    }

    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.warn('[api.js] Guardando localmente debido a error de conexión backend:', error.message)
      const newEntry = {
        ...reviewData,
        id: 'local-' + Date.now(),
        createdAt: new Date().toISOString(),
      }
      try {
        const local = localStorage.getItem('biblioinfo_cached_reviews')
        const pool = local ? JSON.parse(local) : [...INITIAL_REVIEWS]
        pool.unshift(newEntry)
        localStorage.setItem('biblioinfo_cached_reviews', JSON.stringify(pool))
      } catch {
        // Ignore
      }
      return {
        success: true,
        message: 'Reseña registrada con éxito (modo local)',
        review: newEntry,
        data: newEntry,
      }
    }
    console.error('[API createReview] Error al enviar reseña:', error)
    throw error
  }
}
