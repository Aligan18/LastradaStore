import { InstagramOutlined, WhatsAppOutlined } from "@ant-design/icons"
import { MessengerTypes, type MESSENGER } from "@modules"
import { type ReactNode } from "react"

const iconByMessenger: Record<MESSENGER, ReactNode> = {
  [MessengerTypes.INSTAGRAM]: <InstagramOutlined />,
  [MessengerTypes.WHATS_APP]: <WhatsAppOutlined />,
}

type MessengerIconProps = {
  messenger: MESSENGER
}

export const MessengerIcon = ({ messenger }: MessengerIconProps) => {
  return iconByMessenger[messenger]
}
