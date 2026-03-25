import { Card, Statistic, Row, Col, Descriptions, Button, Empty } from "antd"
import { DollarOutlined, ShoppingOutlined } from "@ant-design/icons"
import type { SalaryCalculationResult } from "../../types"

interface Props {
  data: SalaryCalculationResult | undefined
  loading?: boolean
  onPayClick?: () => void
}

export const SalaryCalculationCard = ({ data, loading, onPayClick }: Props) => {
  if (!data) {
    return (
      <Card loading={loading}>
        <Empty description="Нет данных для расчета" />
      </Card>
    )
  }

  const hasSettings = data.settings && data.settings.is_active
  const canPay = hasSettings && data.total_amount > 0 && data.realization_count > 0
  console.log(data.user_name)
  return (
    <Card
      title={`Расчет зарплаты: ${data.user_name || "Пользователь"}`}
      loading={loading}
      extra={
        canPay && (
          <Button type="primary" onClick={onPayClick} icon={<DollarOutlined />}>
            Выплатить зарплату
          </Button>
        )
      }>
      {!hasSettings && <Empty description="Настройки зарплаты не активны или не настроены" />}

      {hasSettings && (
        <>
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Statistic
                title="К выплате"
                value={data.total_amount.toFixed()}
                suffix="₸"
                valueStyle={{ color: "#3f8600" }}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Количество заказов"
                value={data.realization_count}
                prefix={<ShoppingOutlined />}
              />
              <Statistic title="Сумма за заказы" value={data.total_earned} />
            </Col>
          </Row>

          <Descriptions title="Настройки расчета" bordered size="small" column={1}>
            <Descriptions.Item label="Тип расчета">
              {data.settings?.calculation_type === "fixed"
                ? "Фиксированная сумма"
                : "Процент от выручки"}
            </Descriptions.Item>
            {data.settings?.calculation_type === "fixed" && (
              <Descriptions.Item label="Сумма за заказ">
                {data.settings?.fixed_amount} ₸
              </Descriptions.Item>
            )}
            {data.settings?.calculation_type === "percentage" && (
              <Descriptions.Item label="Процент">{data.settings?.percentage}%</Descriptions.Item>
            )}
            <Descriptions.Item label="Средняя сумма за заказ">
              {data.realization_count > 0 ? (data.total_amount / data.realization_count).toFixed() : 0} ₸
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Card>
  )
}
