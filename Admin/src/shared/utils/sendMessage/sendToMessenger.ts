import { MessengerTypes, type MESSENGER } from "@modules"
import { sendToInstagram } from "./messengers/sendToInstagram"
import { sendToWhatsApp } from "./messengers/sendToWhatsApp"

type sendToMessengerProps = { type: MESSENGER; account: string; message: string }

export const sendToMessenger = ({ type, account, message }: sendToMessengerProps) => {
  const messengerByType: Record<MESSENGER, (account: string, message: string) => void> = {
    [MessengerTypes.INSTAGRAM]: sendToInstagram,
    [MessengerTypes.WHATS_APP]: sendToWhatsApp,
  }

  messengerByType[type](account, message)
}
