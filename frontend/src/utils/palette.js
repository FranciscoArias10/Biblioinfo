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
 * Returns deterministic palette for any book title or genre
 */
export function getBookPalette(title = '', genre = '') {
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
