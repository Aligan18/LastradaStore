import { Button, Flex, Popconfirm } from "antd"
import { useState } from "react"

const enum ChangeType {
  DECREMENT = "DECREMENT",
  INCREMENT = "INCREMENT",
}

type CounterProps = {
  count: number
  onChange: (newCount: number) => void
  onDelete: () => void
}

export const Counter = ({ count, onChange, onDelete }: CounterProps) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)

  const handleClick = (type: ChangeType) => {
    const nextValue = type === ChangeType.DECREMENT ? count - 1 : count + 1
    if (nextValue <= 0) {
      setIsOpenConfirm(true)
    } else {
      onChange(nextValue)
    }
  }

  const handleCancel = () => {
    setIsOpenConfirm(false)
  }

  const handleConfirmDelete = () => {
    setIsOpenConfirm(false)
    onDelete()
  }

  return (
    <Flex align="center" gap={10}>
      <Popconfirm
        open={isOpenConfirm}
        title="Удалить товар из списка заказа? "
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
        okText="Да"
        cancelText="Нет">
        <Button size={"small"} onClick={() => handleClick(ChangeType.DECREMENT)}>
          -
        </Button>
      </Popconfirm>
      {count}
      <Button size={"small"} onClick={() => handleClick(ChangeType.INCREMENT)}>
        +
      </Button>
    </Flex>
  )
}
