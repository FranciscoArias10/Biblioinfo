import { getBookPalette } from '../utils/palette'

/**
 * Reusable BookCover Component
 * Exact recreation and componentization of the books in "Clásicos que siguen dando de qué hablar"
 *
 * @param {string} title - Book Title
 * @param {string} author - Book Author
 * @param {string} genre - Book Genre (used for palette if bg/fg not provided)
 * @param {string} bg - Custom background color
 * @param {string} fg - Custom foreground text color
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} size - Size variant
 * @param {number} rotate - Degrees to rotate the book (e.g. -8, 5 for hero)
 * @param {string} count - Optional label under the book (e.g. "4.9 · 12 reseñas")
 * @param {boolean} interactive - Whether to add hover lift effect
 * @param {function} onClick - Optional click handler
 * @param {string} className - Additional CSS classes
 */
export default function BookCover({
  title = 'Sin título',
  author = '',
  genre = '',
  bg,
  fg,
  size = 'md',
  rotate = 0,
  count,
  interactive = true,
  onClick,
  className = '',
  style = {},
}) {
  // Determine colors
  const defaultColors = getBookPalette(title, genre)
  const bookBg = bg || defaultColors.bg
  const bookFg = fg || defaultColors.fg

  // Size specifications
  const sizeMap = {
    xs: {
      width: '72px',
      height: '106px',
      radius: '3px 7px 7px 3px',
      spine: '4px solid rgba(0,0,0,0.22)',
      padding: '8px 7px',
      authorSize: '8px',
      titleSize: '11px',
      titleLineHeight: '1.1',
      shadow: '0 8px 16px -6px rgba(0,0,0,0.45)',
    },
    sm: {
      width: '110px',
      height: '162px',
      radius: '3px 8px 8px 3px',
      spine: '5px solid rgba(0,0,0,0.22)',
      padding: '12px 10px',
      authorSize: '9px',
      titleSize: '14px',
      titleLineHeight: '1.12',
      shadow: '0 14px 24px -10px rgba(0,0,0,0.5)',
    },
    md: {
      width: '150px',
      height: '222px',
      radius: '4px 10px 10px 4px',
      spine: '6px solid rgba(0,0,0,0.22)',
      padding: '16px 13px',
      authorSize: '10px',
      titleSize: '19px',
      titleLineHeight: '1.12',
      shadow: '0 18px 30px -16px rgba(0,0,0,0.55)',
    },
    lg: {
      width: '180px',
      height: '266px',
      radius: '5px 12px 12px 5px',
      spine: '7px solid rgba(0,0,0,0.25)',
      padding: '20px 16px',
      authorSize: '11px',
      titleSize: '22px',
      titleLineHeight: '1.12',
      shadow: '0 24px 40px -18px rgba(0,0,0,0.6)',
    },
    xl: {
      width: '220px',
      height: '326px',
      radius: '6px 14px 14px 6px',
      spine: '8px solid rgba(0,0,0,0.25)',
      padding: '24px 20px',
      authorSize: '12px',
      titleSize: '26px',
      titleLineHeight: '1.15',
      shadow: '0 28px 48px -20px rgba(0,0,0,0.65)',
    },
  }

  const s = sizeMap[size] || sizeMap.md

  const bookStyles = {
    width: s.width,
    height: s.height,
    borderRadius: s.radius,
    backgroundColor: bookBg,
    color: bookFg,
    padding: s.padding,
    borderLeft: s.spine,
    boxShadow: s.shadow,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexShrink: 0,
    ...style,
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col gap-2.5 transition-transform duration-300 ${
        interactive ? 'hover:-translate-y-1.5' : ''
      } ${className}`}
      style={{ width: s.width }}
    >
      <div
        style={bookStyles}
        className="relative overflow-hidden select-none transition-shadow duration-300"
      >
        {/* Subtle page-crease gradient overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(255,255,255,0.06) 6%, transparent 15%, transparent 95%, rgba(0,0,0,0.12) 100%)',
          }}
        />

        {/* Author on top */}
        {author && (
          <span
            style={{
              fontSize: s.authorSize,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              opacity: 0.85,
              fontWeight: 600,
            }}
            className="truncate font-sans relative z-10"
            title={author}
          >
            {author}
          </span>
        )}

        {/* Title at bottom */}
        <span
          style={{
            fontFamily: 'Merriweather, Georgia, serif',
            fontWeight: 900,
            fontSize: s.titleSize,
            lineHeight: s.titleLineHeight,
          }}
          className="line-clamp-4 relative z-10 break-words"
          title={title}
        >
          {title}
        </span>
      </div>

      {/* Optional Count / Review Label under the book */}
      {count && (
        <span className="text-[13px] font-bold text-center text-paper-text dark:text-dark-text truncate">
          {count}
        </span>
      )}
    </div>
  )
}
