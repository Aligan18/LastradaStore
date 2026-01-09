export const sendToWhatsApp = (phone: string, message: string) => {
  if (phone.length === 12) {
    const phoneWithoutPlus = phone.slice(1)
    const url = `https://wa.me/${phoneWithoutPlus}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }
}
