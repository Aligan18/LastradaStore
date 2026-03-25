import { Modal, Form, Input, Descriptions, message } from "antd"
import { useProcessSalaryPaymentMutation } from "../../api"
import type { SalaryCalculationResult } from "../../types"
import dayjs from "dayjs"
import { HumanizeRoles } from "@shared"

interface Props {
  open: boolean
  onClose: () => void
  data: SalaryCalculationResult | null
}

export const SalaryPaymentModal = ({ open, onClose, data }: Props) => {
  const [form] = Form.useForm()
  const [processSalaryPayment, { isLoading }] = useProcessSalaryPaymentMutation()

  if (!data) return null

  const realizationIds = data.pending_realizations.map((r) => r.id)
  const periodFrom =
    data.pending_realizations.length > 0
      ? data.pending_realizations[data.pending_realizations.length - 1].realization_date
      : new Date().toISOString()
  const periodTo =
    data.pending_realizations.length > 0
      ? data.pending_realizations[0].realization_date
      : new Date().toISOString()

  const handleSubmit = async (values: { note?: string }) => {
    try {
      await processSalaryPayment({
        user_id: data.user_id,
        role: data.role,
        amount: data.total_amount,
        realization_ids: realizationIds,
        period_from: periodFrom,
        period_to: periodTo,
        note: values.note,
      }).unwrap()

      message.success("Зарплата успешно выплачена")
      form.resetFields()
      onClose()
    } catch (error) {
      message.error("Ошибка при выплате зарплаты")
      console.error(error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title="Подтверждение выплаты зарплаты"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      okText="Выплатить"
      cancelText="Отмена"
      width={600}>
      <Descriptions bordered column={1} style={{ marginBottom: 16 }}>
        <Descriptions.Item label="Сотрудник">{data.user_name || "—"}</Descriptions.Item>
        <Descriptions.Item label="Роль">
          {HumanizeRoles[data.role]}
        </Descriptions.Item>
        <Descriptions.Item label="Период">
          {dayjs(periodFrom).format("DD.MM.YYYY")} — {dayjs(periodTo).format("DD.MM.YYYY")}
        </Descriptions.Item>
        <Descriptions.Item label="Количество заказов">{data.realization_count}</Descriptions.Item>
        <Descriptions.Item label="Сумма к выплате">
          <span style={{ fontSize: 18, fontWeight: 600, color: "#3f8600" }}>
            {data.total_amount.toFixed()} ₸
          </span>
        </Descriptions.Item>
      </Descriptions>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Примечание (необязательно)" name="note">
          <Input.TextArea
            rows={3}
            placeholder="Дополнительная информация о выплате..."
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
