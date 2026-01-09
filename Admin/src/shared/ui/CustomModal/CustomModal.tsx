import { Button, Modal } from "antd"
import { useState, type ComponentProps, type ReactNode } from "react"

type CustomModalProps = {
  isOpenExternal?: boolean
  setIsOpenExternal?: (isOpen: boolean) => void
  children: ReactNode
  openButtonText?: string
  openComponent?: (showModal: () => void) => ReactNode
} & ComponentProps<typeof Modal>

export const CustomModal = ({
  children,
  openComponent,
  openButtonText,
  isOpenExternal,
  setIsOpenExternal,
  onCancel,
  ...props
}: CustomModalProps) => {
  const [isOpenInternal, setIsOpenInternal] = useState(false)

  const isModalOpen = isOpenExternal !== undefined ? isOpenExternal : isOpenInternal
  const setIsModalOpen = setIsOpenExternal !== undefined ? setIsOpenExternal : setIsOpenInternal

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsModalOpen(false)
    if (onCancel) {
      onCancel(event)
    }
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
      <Modal footer={null} open={isModalOpen} onCancel={handleCancel} {...props}>
        {children}
      </Modal>
    </>
  )
}
