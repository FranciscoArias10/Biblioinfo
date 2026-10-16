export const GENRES_OPTIONS = [
  'Ficción',
  'No Ficción',
  'Ciencia Ficción',
  'Misterio',
  'Fantasía',
  'Romance',
  'Historia',
  'Poesía',
  'Ensayo',
  'Desarrollo Personal',
]

export const RATING_LABELS = {
  1: 'Poco recomendable',
  2: 'Regular',
  3: 'Buena lectura',
  4: 'Muy recomendado',
  5: 'Obra maestra',
}

/**
 * Valida un campo individual del formulario de reseñas.
 * @param {string} name Nombre del campo
 * @param {any} value Valor del campo
 * @param {string} today Fecha límite de hoy en formato YYYY-MM-DD
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
export function validateField(name, value, today = new Date().toISOString().split('T')[0]) {
  switch (name) {
    case 'libro':
      if (!value || String(value).trim().length < 2) {
        return 'El título del libro es obligatorio (mínimo 2 letras).'
      }
      break
    case 'autorLibro': {
      const trimmed = String(value || '').trim()
      if (!trimmed || trimmed.length < 2) {
        return 'El autor del libro es obligatorio (mínimo 2 letras).'
      }
      if (/\d/.test(trimmed)) {
        return 'El nombre del autor no puede contener números.'
      }
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]+$/
      if (!nameRegex.test(trimmed)) {
        return 'El nombre del autor solo puede contener letras y signos válidos.'
      }
      break
    }
    case 'nombre': {
      const trimmed = String(value || '').trim()
      if (!trimmed || trimmed.length < 2) {
        return 'Tu nombre es obligatorio (mínimo 2 letras).'
      }
      if (/\d/.test(trimmed)) {
        return 'Tu nombre no puede contener números.'
      }
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]+$/
      if (!nameRegex.test(trimmed)) {
        return 'Tu nombre solo puede contener letras y signos válidos.'
      }
      break
    }
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!value || !emailRegex.test(String(value).trim())) {
        return 'Ingresa un correo electrónico válido (ejemplo: usuario@correo.com).'
      }
      break
    }
    case 'genero':
      if (!value || !GENRES_OPTIONS.includes(value)) {
        return 'Debes seleccionar un género literario.'
      }
      break
    case 'fecha': {
      if (!value) {
        return 'La fecha es obligatoria.'
      }
      if (value > today) {
        return 'La fecha no puede ser futura. Ingresa el día en que terminaste de leerlo.'
      }
      break
    }
    case 'calificacion': {
      const num = Number(value)
      if (!num || num < 1 || num > 5) {
        return 'Debes seleccionar una calificación (1 a 5 estrellas).'
      }
      break
    }
    case 'descripcion':
      if (!value || String(value).trim().length < 10) {
        return 'La reseña debe contener una descripción de al menos 10 caracteres.'
      }
      break
    default:
      return ''
  }
  return ''
}

/**
 * Valida todos los campos del formulario de forma simultánea.
 * @param {Object} formData Valores actuales del formulario
 * @param {string} today Fecha de hoy
 * @returns {Object} Mapa de errores encontrados
 */
export function validateReviewForm(formData, today) {
  const errors = {}
  Object.keys(formData).forEach((key) => {
    const errorMsg = validateField(key, formData[key], today)
    if (errorMsg) {
      errors[key] = errorMsg
    }
  })
  return errors
}
