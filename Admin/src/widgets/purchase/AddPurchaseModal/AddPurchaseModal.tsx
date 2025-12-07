import { AddProductForm, AddProductVariantForm, AddPurchaseForm } from "@components"
import { ProductSelect, ProductVariantSelect } from "@modules"
import { CustomModal, FormValueConnector, Size } from "@shared"
import { Button, Divider, Flex, Form, Tabs, type TabsProps } from "antd"
import { useState } from "react"

const enum ProductVariantTabs {
  SELECT_VARIANT = "selectVariant",
  CREATE_VARIANT = "createVariant",
}

const enum ProductTabs {
  SELECT_PRODUCT = "selectProduct",
  CREATE_PRODUCT = "createProduct",
}

type FormItems = {
  purchase_price: number
  quantity_added: number
  product: {
    description: string
    images: string[]
    name: string
    price: number
  }
  product_variants: {
    color_id: number
    size: Size
  }
  product_id: number
  product_variant_id: number
}

export const AddPurchaseModal = () => {
  const [form] = Form.useForm()
  const [productVariantTab, setProductVariantTab] = useState<ProductVariantTabs>(
    ProductVariantTabs.SELECT_VARIANT,
  )

  const [productTab, setProductTab] = useState<ProductTabs>(ProductTabs.SELECT_PRODUCT)

  const isCreateProductTab = productTab === ProductTabs.CREATE_PRODUCT

  const handleSubmit = (formData: FormItems) => {}

  const handleChangeProductTab = (key: ProductTabs) => {
    if (key === ProductTabs.CREATE_PRODUCT) {
      setProductVariantTab(ProductVariantTabs.CREATE_VARIANT)
    }
    setProductTab(key)
  }

  const handleChangeVariantTab = (key: ProductVariantTabs) => setProductVariantTab(key)

  const selectProductTabs: TabsProps["items"] = [
    {
      key: ProductTabs.SELECT_PRODUCT,
      label: "Выбрать товар",
      children: <ProductSelect />,
    },
    {
      key: ProductTabs.CREATE_PRODUCT,
      label: "Создать новый товар",
      children: <AddProductForm withoutForm />,
    },
  ]

  const selectProductVariantTabs: TabsProps["items"] = [
    {
      disabled: isCreateProductTab,
      key: ProductVariantTabs.SELECT_VARIANT,
      label: "Выбрать вариант",
      children: (
        <FormValueConnector<number>
          valueByName="product_id"
          name="product_variant_id"
          rules={[{ required: true }]}>
          {(productId) => <ProductVariantSelect productId={productId} key={productId} />}
        </FormValueConnector>
      ),
    },
    {
      key: ProductVariantTabs.CREATE_VARIANT,
      label: "Создать новый вариант",
      children: <AddProductVariantForm withoutForm />,
    },
  ]

  return (
    <CustomModal openButtonText="Создать закуп">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Flex vertical>
          <Tabs
            activeKey={productTab}
            items={selectProductTabs}
            onChange={(key) => handleChangeProductTab(key as ProductTabs)}
          />
          <Divider />
          <Tabs
            items={selectProductVariantTabs}
            activeKey={productVariantTab}
            onChange={(key) => handleChangeVariantTab(key as ProductVariantTabs)}
          />
          <Divider />
          <AddPurchaseForm withoutForm />
          <Divider />
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Flex>
      </Form>
    </CustomModal>
  )
}
