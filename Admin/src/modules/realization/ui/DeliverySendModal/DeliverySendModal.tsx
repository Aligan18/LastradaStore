import { AddressInfoView, OrderNoteView } from "@components"
import { Button, Flex, message, Modal, Typography } from "antd"
import { useState } from "react"
import {
  RealizationStatus,
  useUpdateRealizationMutation,
  type FullRealization,
  type REALIZATION_STATUS,
} from "../../api"

type Props = { realization: FullRealization }

export const DeliverySendModal = ({ realization }: Props) => {
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const [updateRealization] = useUpdateRealizationMutation()

  const handleChangeStatus = async (realizationId: number, newStatus: REALIZATION_STATUS) => {
    try {
      await updateRealization({ id: realizationId, payload: { status: newStatus } }).unwrap()
      setIsFinishModalOpen(false)
    } catch {
      message.error("Ошибка при попытке отправить запрос")
    }
  }

  return (
    <Flex vertical>
      <Modal
        title="Вы отправили по адресу :"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isFinishModalOpen}
        onOk={() => handleChangeStatus(realization.id, RealizationStatus.FINISHED)}
        onCancel={() => setIsFinishModalOpen(false)}>
        <Typography.Title level={5}>{realization.address}</Typography.Title>
      </Modal>
      <strong>Доставка:</strong>
      <AddressInfoView withCopy realization={realization} />
      <OrderNoteView note={realization.note} />
      <Button variant="outlined" onClick={() => setIsFinishModalOpen(true)}>
        Отправлено
      </Button>
    </Flex>
  )
}
