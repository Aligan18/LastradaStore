export const normalizePhone = (value: string) => {
  if (!value) return ""

  let cleaned = value.replace(/\D/g, "")

  if (cleaned === "") return ""

  if (cleaned.startsWith("8")) {
    cleaned = "7" + cleaned.slice(1)
  }

  if (!cleaned.startsWith("7")) {
    cleaned = "7" + cleaned
  }

  return "+" + cleaned
}
