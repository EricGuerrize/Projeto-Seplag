import type { Anexo } from '../tipos/pet'

function isGif(anexo: Anexo): boolean {
  if (anexo.contentType?.toLowerCase() === 'image/gif') return true
  const url = anexo.url?.toLowerCase() || ''
  if (url.endsWith('.gif')) return true
  // Check for .gif before query params
  const path = url.split('?')[0]
  if (path.endsWith('.gif')) return true
  return false
}

/**
 * Returns the best static (non-GIF) photo URL from an entity that has
 * `foto` (singular) and/or `fotos` (array).
 */
export function obterFotoEstatica(entidade: {
  foto?: Anexo
  fotos?: Anexo[]
} | null | undefined): string {
  if (!entidade) return ''
  try {
    // Check singular foto first
    if (entidade.foto?.url && !isGif(entidade.foto)) {
      return entidade.foto.url
    }
    // Fallback to fotos array, filtering out GIFs
    const fotos = entidade.fotos || []
    const fotosEstaticas = fotos.filter((f) => f.url && !isGif(f))
    if (fotosEstaticas.length === 0) return ''
    const ordenadas = [...fotosEstaticas].sort((a, b) => (b.id || 0) - (a.id || 0))
    return ordenadas[0].url || ''
  } catch {
    return ''
  }
}
