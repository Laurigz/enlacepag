const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/

/** Nombre y apellido: al menos dos palabras, solo letras. */
export function isValidFullName(value: string): boolean {
  const v = value.trim().replace(/\s+/g, " ")
  return v.length >= 4 && v.length <= 80 && NAME_RE.test(v) && v.split(" ").filter((w) => w.length >= 2).length >= 2
}

export function isValidEmail(value: string): boolean {
  const v = value.trim()
  return v.length <= 254 && EMAIL_RE.test(v)
}

/**
 * Teléfono argentino con código de área. Acepta, por ejemplo:
 * +54 9 11 2345-6789 · 011 15 2345-6789 · 341 555-1234 · (0341) 15 555-1234
 */
export function isArgentinePhone(value: string): boolean {
  const raw = value.trim()
  if (!/^[\d\s()+.-]+$/.test(raw)) return false
  let d = raw.replace(/\D/g, "")
  if (d.startsWith("54")) {
    d = d.slice(2)
    if (d.startsWith("9")) d = d.slice(1)
  }
  if (d.startsWith("0")) d = d.slice(1)
  // Código de área + abonado = 10 dígitos. Con el "15" de celular intercalado = 12.
  return d.length === 10 || (d.length === 12 && /^\d{2,4}15\d{6,8}$/.test(d))
}
