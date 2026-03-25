import { useState } from "react"
import { Flex, Typography, Select, Tabs, Card, Space, DatePicker, Button } from "antd"
import { ReloadOutlined } from "@ant-design/icons"
import {
  useGetUsersWithSalaryQuery,
  useGetSalarySettingsQuery,
  useGetPendingSalaryQuery,
  useGetSalaryPaymentsQuery,
  useUpdateSalarySettingsMutation,
  SalarySettingsForm,
  SalaryCalculationCard,
  PendingRealizationsTable,
  SalaryPaymentModal,
  SalaryPaymentsHistory,
  getRolesSelector,
  getUserSelector,
} from "@modules"

import type { SalarySettingFormData } from "@modules"
import { Dayjs } from "dayjs"
import { AppRole, HumanizeRoles } from "@shared"
import { useSelector } from "react-redux"

const { RangePicker } = DatePicker

export const SalaryPage = () => {
  const currentUserRole = useSelector(getRolesSelector)
  const isAdmin = currentUserRole.includes(AppRole.ADMIN)
  const currentUser = useSelector(getUserSelector)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(isAdmin ? null : currentUser?.id ?? null)
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)


  const { data: users, isLoading: usersLoading } = useGetUsersWithSalaryQuery()
  const { data: settings, isLoading: settingsLoading } = useGetSalarySettingsQuery(
    { userId: selectedUserId! },
    { skip: !selectedUserId },
  )
  console.log("selectedUserId", selectedUserId)


  const selectedUser = users?.find((u) => u.user_id === selectedUserId)


  const {
    data: pendingSalary,
    isLoading: pendingLoading,
    refetch: refetchPending,
  } = useGetPendingSalaryQuery(
    {
      userId: selectedUserId!,
      role: selectedUser?.role || "manager",
      dateFrom: dateRange?.[0]?.format("YYYY-MM-DD"),
      dateTo: dateRange?.[1]?.format("YYYY-MM-DD"),
    },
    { skip: !selectedUserId || !selectedUser },
  )

  console.log(pendingSalary)

  const { data: paymentsData, isLoading: paymentsLoading } = useGetSalaryPaymentsQuery({
    userId: selectedUserId || undefined,
  })

  const [updateSettings, { isLoading: updateLoading }] = useUpdateSalarySettingsMutation()

  const handleUserChange = (userId: string) => {
    setSelectedUserId(userId)
    setDateRange(null)
  }

  const handleSettingsSubmit = async (values: SalarySettingFormData) => {
    console.log("values", values)
    try {
      await updateSettings(values).unwrap()
    } catch (error) {
      console.error("Failed to update settings:", error)
    }
  }

  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    setDateRange(dates)
  }

  const handlePayClick = () => {
    setIsPaymentModalOpen(true)
  }

  const handlePaymentModalClose = () => {
    setIsPaymentModalOpen(false)
    refetchPending()
  }

  return (
    <Flex vertical gap={20} style={{ padding: "20px" }}>
      <Flex justify="center">
        <Typography.Title level={3}>Управление зарплатами</Typography.Title>
      </Flex>

      {isAdmin && <Card>
        <Space vertical style={{ width: "100%" }} size="middle">
          <div>
            <Typography.Text strong>Выберите сотрудника:</Typography.Text>
            <Select
              style={{ width: "100%", marginTop: 8 }}
              placeholder="Выберите менеджера или упаковщика"
              loading={usersLoading}
              value={selectedUserId}
              onChange={handleUserChange}
              showSearch
              optionFilterProp="label"
              options={users?.map((user) => ({
                value: user.user_id,
                label: `${user.user_name || user.user_id} (${HumanizeRoles[user.role]
                  }) ${user.has_settings ? "✓" : ""}`,
              }))}
            />
          </div>
        </Space>
      </Card>}

      {selectedUserId && selectedUser && (
        <Tabs
          defaultActiveKey="calculation"
          items={[
            {
              key: "calculation",
              label: "Расчет зарплаты",
              children: (
                <Flex vertical gap={16}>
                  <Card size="small">
                    <Space>
                      <Typography.Text>Период:</Typography.Text>
                      <RangePicker
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        format="DD.MM.YYYY"
                        placeholder={["От", "До"]}
                      />
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={() => refetchPending()}
                        loading={pendingLoading}>
                        Обновить
                      </Button>
                    </Space>
                  </Card>

                  <SalaryCalculationCard
                    data={pendingSalary}
                    loading={pendingLoading}
                    onPayClick={handlePayClick}
                  />

                  {pendingSalary && pendingSalary.pending_realizations.length > 0 && (
                    <Card title="Неоплаченные заказы">
                      <PendingRealizationsTable
                        data={pendingSalary.pending_realizations}
                        loading={pendingLoading}
                      />
                    </Card>
                  )}
                </Flex>
              ),
            },
            {
              key: "settings",
              label: "Настройки",
              children: (
                <Card title="Настройки расчета зарплаты">
                  <SalarySettingsForm
                    initialValues={settings}
                    onSubmit={handleSettingsSubmit}
                    loading={updateLoading || settingsLoading}
                    userId={selectedUserId}
                  />
                </Card>
              ),
            },
            {
              key: "history",
              label: "История выплат",
              children: (
                <Card title="История выплат">
                  <SalaryPaymentsHistory
                    data={paymentsData?.data || []}
                    loading={paymentsLoading}
                  />
                </Card>
              ),
            },
          ]}
        />
      )}

      <SalaryPaymentModal
        open={isPaymentModalOpen}
        onClose={handlePaymentModalClose}
        data={pendingSalary || null}
      />
    </Flex>
  )
}
