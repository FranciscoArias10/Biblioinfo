/**
 * Servicio de búsqueda de libros y portadas externas.
 * Consulta la API de Google Books (con fallback a Open Library) para
 * proporcionar sugerencias automáticas, autor y portada mientras el usuario escribe.
 */

import { GENRES_OPTIONS } from '../utils/reviewValidator'

/**
 * Mapea categorías en inglés o español devueltas por la API al listado oficial de géneros.
 * @param {string} category
 * @returns {string}
 */
export function mapCategoryToGenre(category = '') {
  if (!category || typeof category !== 'string') return ''
  const c = category.toLowerCase()

  if (c.includes('science fiction') || c.includes('ciencia ficción') || c.includes('sci-fi')) {
    return 'Ciencia Ficción'
  }
  if (c.includes('fantasy') || c.includes('fantasía')) {
    return 'Fantasía'
  }
  if (
    c.includes('mystery') ||
    c.includes('misterio') ||
    c.includes('thriller') ||
    c.includes('suspense') ||
    c.includes('crime') ||
    c.includes('detective')
  ) {
    return 'Misterio'
  }
  if (c.includes('romance') || c.includes('amor') || c.includes('romantic')) {
    return 'Romance'
  }
  if (c.includes('history') || c.includes('historia') || c.includes('historical')) {
    return 'Historia'
  }
  if (c.includes('poetry') || c.includes('poesía') || c.includes('poemas')) {
    return 'Poesía'
  }
  if (c.includes('essay') || c.includes('ensayo') || c.includes('literary collections')) {
    return 'Ensayo'
  }
  if (
    c.includes('self-help') ||
    c.includes('desarrollo') ||
    c.includes('personal') ||
    c.includes('autoayuda') ||
    c.includes('psychology') ||
    c.includes('business')
  ) {
    return 'Desarrollo Personal'
  }
  if (c.includes('non-fiction') || c.includes('no ficción')) {
    return 'No Ficción'
  }
  if (c.includes('fiction') || c.includes('ficción') || c.includes('novela') || c.includes('juvenile fiction')) {
    return 'Ficción'
  }

  // Comprobar si coincide directamente con alguno de nuestros géneros
  const exact = GENRES_OPTIONS.find((g) => g.toLowerCase() === c.trim())
  return exact || ''
}

/**
 * Busca libros por término en Google Books API con respaldo transparente en Open Library.
 * @param {string} query Texto escrito por el usuario
 * @returns {Promise<Array<{ id: string, title: string, author: string, category: string, suggestedGenre: string, cover: string|null, source: string }>>}
 */
export async function searchBooks(query) {
  const trimmed = (query || '').trim()
  if (trimmed.length < 2) return []

  const encoded = encodeURIComponent(trimmed)

  // 1. Google Books API (conforme a la especificación del usuario)
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encoded}&maxResults=6`
    )

    if (response.ok) {
      const data = await response.json()
      if (data.items && data.items.length > 0) {
        return data.items
          .filter((item) => item.volumeInfo && item.volumeInfo.title)
          .map((item) => {
            const info = item.volumeInfo
            const title = info.title.trim()
            const author = info.authors?.[0] || (Array.isArray(info.authors) ? info.authors.join(', ') : '')
            const category = info.categories?.[0] || ''
            const rawThumb = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || null
            const cover = rawThumb ? rawThumb.replace('http://', 'https://') : null

            return {
              id: item.id || `gb-${title}`,
              title,
              author,
              category,
              suggestedGenre: mapCategoryToGenre(category),
              cover,
              source: 'Google Books',
            }
          })
      }
    }
  } catch (err) {
    console.warn('[searchBooks] Error en Google Books API, activando fallback:', err)
  }

  // 2. Open Library Search API como respaldo en caso de cuota excedida (429) o error de red
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encoded}&limit=6`
    )

    if (response.ok) {
      const data = await response.json()
      if (data.docs && data.docs.length > 0) {
        return data.docs
          .filter((doc) => doc.title)
          .map((doc) => {
            const title = doc.title.trim()
            const author = doc.author_name?.[0] || (Array.isArray(doc.author_name) ? doc.author_name.join(', ') : '')
            const category = doc.subject?.[0] || ''
            const cover = doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : null

            return {
              id: doc.key || `ol-${title}`,
              title,
              author,
              category,
              suggestedGenre: mapCategoryToGenre(category),
              cover,
              source: 'Open Library',
            }
          })
      }
    }
  } catch (err) {
    console.warn('[searchBooks] Error en Open Library fallback:', err)
  }

  return []
}
