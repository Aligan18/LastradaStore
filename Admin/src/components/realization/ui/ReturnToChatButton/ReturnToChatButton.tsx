import type { MESSENGER } from "@modules"
import { sendToMessenger } from "@shared"
import { Button, type ButtonProps } from "antd"
import type { ReactNode } from "react"

type ReturnToChatButtonProps = {
  children: ReactNode
  messenger: MESSENGER
  account: string
} & ButtonProps

export const ReturnToChatButton = ({
  children,
  messenger,
  account,
  ...props
}: ReturnToChatButtonProps) => {
  const handleReturnToChat = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation()
    sendToMessenger({ type: messenger, account, message: "" })
  }

  return (
    <Button onClick={handleReturnToChat} {...props}>
      {children}
    </Button>
  )
}
