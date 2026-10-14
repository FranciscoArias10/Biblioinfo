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
    await fs.writeFile(DATA_FILE, jsonString, 'utf-8');
  } catch (error) {
    console.error('[fileHandler] Error escribiendo en reviews.json:', error);
    throw new Error('No se pudo guardar la información en el almacenamiento');
  }
}
