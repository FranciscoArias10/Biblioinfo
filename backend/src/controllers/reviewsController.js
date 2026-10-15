import crypto from 'node:crypto';
import { readReviews, addReview } from '../utils/fileHandler.js';
import { validateReview } from '../utils/validator.js';

/**
 * Controlador para obtener todas las reseñas almacenadas.
 * GET /registros
 */
export async function getReviews(req, res) {
  try {
    const reviews = await readReviews();

    // Filtro opcional por género mediante query param (?genero=Ficcion)
    const { genero } = req.query;
    if (genero && typeof genero === 'string' && genero.trim() !== '') {
      const filtered = reviews.filter(
        (r) => r.genero && r.genero.toLowerCase() === genero.trim().toLowerCase()
      );
      return res.status(200).json(filtered);
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('[reviewsController] Error en getReviews:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al consultar las reseñas',
      error: error.message
    });
  }
}

/**
 * Controlador para crear una nueva reseña persistente.
 * POST /registros
 */
export async function createReview(req, res) {
  try {
    const reviewData = req.body;

    // Validación exhaustiva de los campos recibidos
    const validation = validateReview(reviewData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Datos de la reseña inválidos o incompletos',
        errors: validation.errors
      });
    }

    // Sanitización y armado del nuevo registro con ID único (UUID v4)
    const newReview = {
      id: crypto.randomUUID(),
      libro: reviewData.libro.trim(),
      autorLibro: reviewData.autorLibro.trim(),
      nombre: reviewData.nombre.trim(),
      email: reviewData.email.trim().toLowerCase(),
      genero: reviewData.genero.trim(),
      fecha: reviewData.fecha.trim(),
      calificacion: Number(reviewData.calificacion) || 5,
      descripcion: reviewData.descripcion.trim(),
      createdAt: new Date().toISOString()
    };

    // Persistencia en reviews.json mediante la cola de escrituras
    await addReview(newReview);

    return res.status(201).json({
      success: true,
      message: 'Reseña registrada exitosamente',
      data: newReview
    });
  } catch (error) {
    console.error('[reviewsController] Error en createReview:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al guardar la reseña',
      error: error.message
    });
  }
}
