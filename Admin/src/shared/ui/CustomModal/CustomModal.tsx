import { Button, Modal } from "antd"
import { useState, type ComponentProps, type ReactNode } from "react"

type CustomModalProps = {
  children: ReactNode
  openButtonText?: string
  openComponent?: (showModal: () => void) => ReactNode
} & ComponentProps<typeof Modal>

export const CustomModal = ({ children, openComponent, openButtonText }: CustomModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      {openComponent ? (
        openComponent(showModal)
      ) : (
        <Button type="primary" onClick={showModal}>
          {openButtonText}
        </Button>
      )}
      <Modal footer={null} title="Закуп" open={isModalOpen} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  )
}
