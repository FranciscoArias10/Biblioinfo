import express from 'express';
import cors from 'cors';
import reviewsRoutes from './routes/reviewsRoutes.js';
import { ensureDataFileExists } from './utils/fileHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS para permitir la comunicación fluida con el frontend de React
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen (ej. http://localhost:5173)
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para procesar cuerpos de solicitud en formato JSON
app.use(express.json());

// Middleware simple para registro de peticiones en consola
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Ruta raíz para verificación del estado del servidor (Health Check)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    project: 'BiblioInfo - API de Reseñas de Libros',
    version: '1.0.0',
    endpoints: {
      getAllReviews: 'GET /registros',
      createReview: 'POST /registros'
    }
  });
});

// Montaje de las rutas principales según los requisitos de la evaluación
app.use('/registros', reviewsRoutes);
// Alias adicional para compatibilidad con convenciones /api/registros
app.use('/api/registros', reviewsRoutes);

// Manejador para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta ${req.originalUrl} no encontrada en el servidor`
  });
});

// Manejador global de errores no capturados (500)
app.use((err, req, res, next) => {
  console.error('[server error]', err);
  res.status(500).json({
    success: false,
    message: 'Ocurrió un error inesperado en el servidor',
    error: err.message
  });
});

// Inicialización del servidor y verificación del archivo de persistencia
app.listen(PORT, async () => {
  try {
    await ensureDataFileExists();
    console.log(`====================================================`);
    console.log(`🚀 Servidor BiblioInfo ejecutándose en: http://localhost:${PORT}`);
    console.log(`📖 Endpoint GET:  http://localhost:${PORT}/registros`);
    console.log(`📝 Endpoint POST: http://localhost:${PORT}/registros`);
    console.log(`====================================================`);
  } catch (error) {
    console.error('❌ Error al inicializar el almacenamiento de datos:', error);
  }
});
