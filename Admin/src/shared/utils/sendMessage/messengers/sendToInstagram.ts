export const sendToInstagram = (account: string, message: string) => {
  if (message) {
    navigator.clipboard.writeText(message)
  }
  if (account) {
    const url = `https://ig.me/m/${account}`
    window.open(url, "_blank")
  }
}
