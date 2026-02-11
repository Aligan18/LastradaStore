import { Divider, Flex } from "antd"

type Props = {
  note: string | null
}

export const OrderNoteView = ({ note }: Props) => {
  if (!note) return null

  return (
    <Flex vertical>
      <Divider size="small" />
      <strong>Комментарий к заказу:</strong>
      {note}
      <Divider size="small" />
    </Flex>
  )
}
