import { Router } from 'express';
import { getReviews, createReview } from '../controllers/reviewsController.js';

const router = Router();

// Endpoint GET /registros - Consultar todas las reseñas
router.get('/', getReviews);

// Endpoint POST /registros - Crear una nueva reseña
router.post('/', createReview);

export default router;
