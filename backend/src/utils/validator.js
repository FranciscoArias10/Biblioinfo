/**
 * Validador de datos para el registro de reseñas de libros.
 * Comprueba tipos, campos obligatorios, formato de email, fechas y longitudes mínimas.
 * 
 * @param {Object} data Datos recibidos en la petición POST.
 * @returns {{ isValid: boolean, errors: string[] }}
 */
export function validateReview(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return {
      isValid: false,
      errors: ['El cuerpo de la solicitud debe ser un objeto JSON válido']
    };
  }

  const {
    libro,
    autorLibro,
    nombre,
    email,
    genero,
    fecha,
    calificacion,
    descripcion,
    portada,
    libroId
  } = data;

  // Validación: Título del libro
  if (!libro || typeof libro !== 'string' || libro.trim().length < 2) {
    errors.push('El título del libro es obligatorio y debe tener al menos 2 caracteres.');
  }

  // Validación: Autor de la obra
  if (!autorLibro || typeof autorLibro !== 'string' || autorLibro.trim().length < 2) {
    errors.push('El autor del libro es obligatorio y debe tener al menos 2 caracteres.');
  } else if (/\d/.test(autorLibro)) {
    errors.push('El nombre del autor del libro no puede contener números.');
  }

  // Validación: Nombre del reseñador
  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    errors.push('El nombre del autor de la reseña es obligatorio y debe tener al menos 2 caracteres.');
  } else if (/\d/.test(nombre)) {
    errors.push('Tu nombre como autor de la reseña no puede contener números.');
  }

  // Validación: Formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push('El correo electrónico es obligatorio y debe tener un formato válido (ejemplo: usuario@correo.com).');
  }

  // Validación: Género / Categoría
  if (!genero || typeof genero !== 'string' || genero.trim().length < 2) {
    errors.push('El género o categoría literaria es obligatorio.');
  }

  // Validación: Fecha (formato AAAA-MM-DD, el mismo que envía <input type="date">)
  if (!fecha || typeof fecha !== 'string') {
    errors.push('La fecha de la reseña es obligatoria.');
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha.trim()) || isNaN(new Date(fecha.trim()).getTime()) || new Date(fecha.trim()).toISOString().slice(0, 10) !== fecha.trim()) {
    errors.push('La fecha proporcionada tiene un formato no válido (use AAAA-MM-DD).');
  } else if (fecha.trim() > getLocalToday()) {
    // Se compara como texto AAAA-MM-DD contra la fecha local de hoy.
    // new Date('2026-10-13') se interpreta en UTC y en Ecuador (UTC-5) dejaba pasar la fecha de mañana.
    errors.push('La fecha de la reseña no puede ser futura.');
  }

  // Validación: Calificación (1 a 5 estrellas)
  const numericRating = Number(calificacion);
  if (calificacion !== undefined && (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5)) {
    errors.push('La calificación debe ser un número entero entre 1 y 5 estrellas.');
  }

  // Validación: Descripción / Contenido de la reseña
  if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length < 10) {
    errors.push('La descripción de la reseña es obligatoria y debe tener al menos 10 caracteres.');
  }

  // Validación: Portada (opcional). Llega solo si el usuario eligió un libro del catálogo externo.
  // Se guarda únicamente el enlace a la imagen, nunca la imagen en sí.
  if (portada !== undefined && portada !== null && portada !== '') {
    if (typeof portada !== 'string' || portada.trim().length > 1500 || !isHttpsUrl(portada.trim())) {
      errors.push('La portada debe ser un enlace https válido a una imagen.');
    }
  }

  // Validación: Identificador del libro en el catálogo externo (opcional)
  if (libroId !== undefined && libroId !== null && libroId !== '') {
    if (typeof libroId !== 'string' || libroId.trim().length > 100) {
      errors.push('El identificador del libro no es válido.');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Devuelve la fecha local de hoy en formato AAAA-MM-DD.
 * @returns {string}
 */
function getLocalToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Comprueba que un texto sea un enlace https bien formado.
 * @param {string} value
 * @returns {boolean}
 */
function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}
