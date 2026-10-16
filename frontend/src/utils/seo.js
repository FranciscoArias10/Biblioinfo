import { useEffect } from 'react'

/**
 * Hook reutilizable para gestión dinámica de SEO (Title, Meta Description, Open Graph y Canonical)
 * Permite que cada ruta del SPA actualice dinámicamente los metadatos para motores de búsqueda.
 *
 * @param {Object} seoConfig
 * @param {string} seoConfig.title - Título específico de la página
 * @param {string} [seoConfig.description] - Meta descripción optimizada
 * @param {string} [seoConfig.keywords] - Palabras clave separadas por comas
 * @param {string} [seoConfig.canonical] - URL canónica de la ruta
 */
export function useSEO({ title, description, keywords, canonical }) {
  useEffect(() => {
    // 1. Actualizar Title
    if (title) {
      document.title = title.includes('Biblioinfo') ? title : `${title} — Biblioinfo`
    }

    // 2. Actualizar Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description

      // Open Graph Description
      let ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.content = description

      // Twitter Description
      let twDesc = document.querySelector('meta[name="twitter:description"]')
      if (twDesc) twDesc.content = description
    }

    // 3. Actualizar Open Graph Title & Twitter Title
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.content = document.title

      let twTitle = document.querySelector('meta[name="twitter:title"]')
      if (twTitle) twTitle.content = document.title
    }

    // 4. Actualizar Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.name = 'keywords'
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.content = keywords
    }

    // 5. Actualizar URL Canónica
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]')
      if (!linkCanonical) {
        linkCanonical = document.createElement('link')
        linkCanonical.rel = 'canonical'
        document.head.appendChild(linkCanonical)
      }
      linkCanonical.href = canonical

      let ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.content = canonical
    }
  }, [title, description, keywords, canonical])
}
