import { CustomModal, useAppDispatch, type ValueOf } from "@shared"
import { Tabs, type TabsProps } from "antd"

import { DollarOutlined, HomeOutlined, IdcardOutlined, SkinOutlined } from "@ant-design/icons"

import { AddProductToRealizationTab } from "./AddProductToRealizationTab/AddProductToRealizationTab"
import {
  AddAccountInfoForm,
  AddCustomerDelivery,
  deriveAccountByMessenger,
  getIsOpenRealizationModalSelector,
  getRealizationIdSelector,
  resetFormFields,
  setCurrentAccount,
  setIsOpenRealizationModal,
  setMessengerType,
  useGetRealizationByIdQuery,
  RealizationSteps,
  useUpdateRealizationMutation,
  CheckoutTab,
  getCurrentAccountSelector,
  getMessengerTypeSelector,
  useGetRealizationItemsQuery,
} from "@modules"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { MessengerIcon, ReturnToChatButton } from "@components"

const ACCOUNT_INFO_STEP = "account_info"

export const AddRealizationModal = () => {
  const dispatch = useAppDispatch()
  const isOpenRealizationModal = useSelector(getIsOpenRealizationModalSelector)
  const currentMessenger = useSelector(getMessengerTypeSelector)
  const account = useSelector(getCurrentAccountSelector)
  const [updateRealization] = useUpdateRealizationMutation()

  const realizationId = useSelector(getRealizationIdSelector)
  const { realization, isSuccess } = useGetRealizationByIdQuery(realizationId as number, {
    skip: !realizationId,
    selectFromResult: ({ data, isSuccess }) => ({ realization: data?.data ?? null, isSuccess }),
  })
  const { realizationItems } = useGetRealizationItemsQuery(
    { id: realizationId as number },
    {
      selectFromResult: ({ data }) => ({
        realizationItems: data?.data ?? [],
      }),
      skip: !realizationId,
    },
  )

  const [activeTab, setActiveTab] = useState(realizationId ? realization?.steps : ACCOUNT_INFO_STEP)

  useEffect(() => {
    if (
      realizationId &&
      realization &&
      (realization.instagram_account || realization.whats_app_account)
    ) {
      const { messenger, steps } = realization
      if (messenger) {
        const currentAccount = deriveAccountByMessenger(realization, messenger)
        dispatch(setCurrentAccount(currentAccount))
        dispatch(setMessengerType(messenger))
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setActiveTab(steps)
      }
    }
  }, [realizationId, realization, dispatch])

  const handleChangeIsOpen = (isOpen: boolean) => {
    dispatch(setIsOpenRealizationModal(isOpen))
  }

  const handleTabClick = async (
    activeKey: ValueOf<typeof RealizationSteps> | typeof ACCOUNT_INFO_STEP,
  ) => {
    const stepQueue = [
      RealizationSteps.ADD_PRODUCTS,
      RealizationSteps.CLIENT_INFO,
      RealizationSteps.PAYMENT,
    ]

    const isNextStep =
      stepQueue.findIndex((step) => step === activeKey) >
      stepQueue.findIndex((step) => step === realization?.steps)

    if (isNextStep && realizationId && activeKey !== ACCOUNT_INFO_STEP) {
      await updateRealization({ id: realizationId, payload: { steps: activeKey } })
    }

    setActiveTab(activeKey)
  }

  const items: TabsProps["items"] = [
    {
      key: ACCOUNT_INFO_STEP,
      label: <IdcardOutlined />,
      children: <AddAccountInfoForm />,
    },
    {
      disabled: !realizationId,
      key: RealizationSteps.ADD_PRODUCTS,
      label: <SkinOutlined />,
      children: <AddProductToRealizationTab />,
    },
    {
      disabled: !realizationId,
      key: RealizationSteps.CLIENT_INFO,
      label: <HomeOutlined />,
      children: <AddCustomerDelivery />,
    },
    {
      disabled: Boolean(!realizationId || realizationItems.length === 0 || !realization?.address),
      key: RealizationSteps.PAYMENT,
      label: <DollarOutlined />,
      children: <CheckoutTab />,
    },
  ]

  if (realizationId && !isSuccess) {
    return null
  }

  return (
    <CustomModal
      title={realizationId && `Заказ №${realizationId} (${account})`}
      destroyOnHidden
      onCancel={() => dispatch(resetFormFields())}
      isOpenExternal={isOpenRealizationModal}
      setIsOpenExternal={handleChangeIsOpen}
      style={{ top: 5 }}
      width={1000}
      openButtonText="Оформить новый заказ">
      <Tabs
        activeKey={realizationId ? activeTab : ACCOUNT_INFO_STEP}
        destroyOnHidden
        key={realizationId}
        tabBarExtraContent={{
          left: account && currentMessenger && (
            <ReturnToChatButton type="primary" account={account} messenger={currentMessenger}>
              <MessengerIcon messenger={currentMessenger} />
            </ReturnToChatButton>
          ),
        }}
        onTabClick={(activeKey) =>
          handleTabClick(activeKey as ValueOf<typeof RealizationSteps> | typeof ACCOUNT_INFO_STEP)
        }
        centered
        items={items}
      />
    </CustomModal>
  )
}
