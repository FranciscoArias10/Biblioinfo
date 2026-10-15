/**
 * Curated color palettes for book covers matching Biblioinfo design tokens
 */
export const BOOK_PALETTES = [
  { bg: '#1F3B4D', fg: '#F3ECE2' }, // Deep Navy / Cream
  { bg: '#E9D9BF', fg: '#3A2418' }, // Vintage Parchment / Dark Walnut
  { bg: '#C9733A', fg: '#141312' }, // Terracotta Orange / Ink
  { bg: '#3B2C4A', fg: '#F3ECE2' }, // Royal Plum / Ivory
  { bg: '#8C5E48', fg: '#F3ECE2' }, // Warm Leather / Cream
  { bg: '#141312', fg: '#F3ECE2' }, // Obsidian / Off-white
  { bg: '#B8352A', fg: '#F3ECE2' }, // Crimson / Linen
  { bg: '#2E2A27', fg: '#E9D9BF' }, // Deep Charcoal / Gold
  { bg: '#6F7A55', fg: '#F3ECE2' }, // Olive Sage / Cream
  { bg: '#D98C7A', fg: '#141312' }, // Dusty Rose / Ink
]

/**
 * Exact curated book covers matching the home page design
 */
export const KNOWN_BOOK_COVERS = {
  // Classics explicitly featured in "Clásicos que siguen dando de qué hablar" in Home.jsx
  'dune': { bg: '#C9733A', fg: '#141312' },
  'la sombra del viento': { bg: '#141312', fg: '#F3ECE2' },
  'rayuela': { bg: '#F3ECE2', fg: '#141312' },
  'ficciones': { bg: '#3B2C4A', fg: '#F3ECE2' },
  'orgullo y prejuicio': { bg: '#D98C7A', fg: '#141312' },
  'frankenstein': { bg: '#1F3B4D', fg: '#F3ECE2' },
  'el principito': { bg: '#E9D9BF', fg: '#3A2418' },

  // Books featured in Home Hero
  'proyecto hail mary': { bg: '#1F3B4D', fg: '#F3ECE2' },
  'cien anos de soledad': { bg: '#E9D9BF', fg: '#3A2418' },
  'cien años de soledad': { bg: '#E9D9BF', fg: '#3A2418' },

  // Other canonical books and community reviews
  'habitos atomicos': { bg: '#8C5E48', fg: '#F3ECE2' },
  'hábitos atómicos': { bg: '#8C5E48', fg: '#F3ECE2' },
  'sapiens': { bg: '#8C5E48', fg: '#F3ECE2' },
  'el nombre de la rosa': { bg: '#241E1A', fg: '#F3ECE2' },
  '1984': { bg: '#2E2A27', fg: '#F3ECE2' },
  'el nombre del viento': { bg: '#164E63', fg: '#F3ECE2' },
  'pedro paramo': { bg: '#4A3B32', fg: '#F3ECE2' },
  'pedro páramo': { bg: '#4A3B32', fg: '#F3ECE2' },
  'latidos que no dije': { bg: '#D98C7A', fg: '#141312' },
}

/**
 * Palettes matching the canonical genre colors from Home.jsx
 */
export const GENRE_PALETTES = {
  'ficcion': { bg: '#E08738', fg: '#141312' },
  'ciencia ficcion': { bg: '#1F3B4D', fg: '#F3ECE2' },
  'fantasia': { bg: '#3B2C4A', fg: '#F3ECE2' },
  'historia': { bg: '#8C5E48', fg: '#F3ECE2' },
  'romance': { bg: '#D98C7A', fg: '#141312' },
  'misterio': { bg: '#2E2A27', fg: '#F3ECE2' },
  'poesia': { bg: '#E9D9BF', fg: '#141312' },
  'ensayo': { bg: '#6F7A55', fg: '#F3ECE2' },
  'desarrollo personal': { bg: '#8C5E48', fg: '#F3ECE2' },
  'clasico': { bg: '#4A3B32', fg: '#F3ECE2' },
}

function normalizeKey(str = '') {
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Returns deterministic palette for any book title or genre
 */
export function getBookPalette(title = '', genre = '') {
  const normTitle = normalizeKey(title)

  // 1. Direct match for known books
  if (normTitle && KNOWN_BOOK_COVERS[normTitle]) {
    return KNOWN_BOOK_COVERS[normTitle]
  }

  // 2. Substring match for known books (e.g. "Dune: Primera Parte" -> "Dune")
  if (normTitle) {
    for (const [key, palette] of Object.entries(KNOWN_BOOK_COVERS)) {
      const normK = normalizeKey(key)
      if (normTitle === normK || normTitle.includes(normK) || normK.includes(normTitle)) {
        return palette
      }
    }
  }

  // 3. Fallback to genre palette if available
  const normGenre = normalizeKey(genre)
  if (normGenre && GENRE_PALETTES[normGenre]) {
    return GENRE_PALETTES[normGenre]
  }

  // 4. Deterministic hash fallback
  const str = (title + ' ' + genre).toLowerCase()
  if (!str.trim()) return BOOK_PALETTES[0]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const index = Math.abs(hash) % BOOK_PALETTES.length
  return BOOK_PALETTES[index]
}

