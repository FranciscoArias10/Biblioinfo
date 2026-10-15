import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo JSON de persistencia
const DATA_DIR = path.resolve(__dirname, '../../data');
const DATA_FILE = path.join(DATA_DIR, 'reviews.json');

/**
 * Asegura que el directorio y el archivo de persistencia existan.
 * Si el archivo no existe o está corrupto, lo inicializa con un array vacío.
 */
export async function ensureDataFileExists() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // Si el archivo no existe, lo creamos con []
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('[fileHandler] Error inicializando el archivo de datos:', error);
    throw error;
  }
}

/**
 * Lee todas las reseñas del archivo JSON.
 * @returns {Promise<Array>} Array de objetos de reseñas.
 */
export async function readReviews() {
  try {
    await ensureDataFileExists();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const trimmed = content.trim();
    if (!trimmed) {
      return [];
    }
    const data = JSON.parse(trimmed);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('[fileHandler] Error leyendo el archivo reviews.json:', error);
    throw new Error('No se pudo leer el archivo de almacenamiento');
  }
}

/**
 * Sobrescribe el archivo JSON con la lista actualizada de reseñas.
 * @param {Array} reviews Array de objetos de reseñas.
 */
export async function writeReviews(reviews) {
  try {
    await ensureDataFileExists();
    const jsonString = JSON.stringify(reviews, null, 2);
    const tempFile = `${DATA_FILE}.tmp`;
    await fs.writeFile(tempFile, jsonString, 'utf-8');
    await fs.rename(tempFile, DATA_FILE);
  } catch (error) {
    console.error('[fileHandler] Error escribiendo en reviews.json:', error);
    throw new Error('No se pudo guardar la información en el almacenamiento');
  }
}

// Cola de escrituras: cada guardado espera a que termine el anterior.
// Evita que dos POST simultáneos lean el mismo archivo y uno sobrescriba al otro.
let writeQueue = Promise.resolve();

/**
 * Agrega una reseña al inicio de la lista y la guarda en disco,
 * de una en una, sin perder las reseñas anteriores.
 * @param {Object} review Reseña ya validada.
 * @returns {Promise<Object>} La reseña guardada.
 */
export function addReview(review) {
  const task = writeQueue.then(async () => {
    const reviews = await readReviews();

    // Sincronizar foto de portada entre todas las reseñas del mismo libro
    if (review.libro && typeof review.libro === 'string') {
      const normTitle = review.libro.trim().toLowerCase();

      if (review.portada) {
        // Caso A: La nueva reseña aporta una portada -> actualizar reseñas anteriores del libro que no la tengan
        for (const r of reviews) {
          if (r.libro && r.libro.trim().toLowerCase() === normTitle) {
            if (!r.portada) {
              r.portada = review.portada;
            }
            if (!r.libroId && review.libroId) {
              r.libroId = review.libroId;
            }
          }
        }
      } else {
        // Caso B: La nueva reseña no tiene portada -> heredar portada si el libro ya estaba registrado con una
        const existingWithCover = reviews.find(
          (r) => r.libro && r.libro.trim().toLowerCase() === normTitle && r.portada
        );
        if (existingWithCover) {
          review.portada = existingWithCover.portada;
          if (!review.libroId && existingWithCover.libroId) {
            review.libroId = existingWithCover.libroId;
          }
        }
      }
    }

    reviews.unshift(review); // Las más recientes primero
    await writeReviews(reviews);
    return review;
  });
  // Si un guardado falla, la cola sigue funcionando para los siguientes
  writeQueue = task.catch(() => {});
  return task;
}
