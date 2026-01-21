import {
  AddProductForm,
  AddProductVariantForm,
  AddPurchaseForm,
  type AddProductFormItems,
  type AddProductVariantsFormItems,
  type AddPurchaseFormItems,
} from "@components"
import {
  ProductSelect,
  ProductVariantSelect,
  useCreateProductMutation,
  useCreateProductVariantMutation,
  useCreatePurchaseMutation,
} from "@modules"
import { CustomModal, FormValueConnector } from "@shared"
import { Button, Divider, Flex, Form, message, Tabs, type TabsProps } from "antd"
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
  product_id: number
  product_variant_id: number
  product: AddProductFormItems
  product_variants: AddProductVariantsFormItems
  purchase: AddPurchaseFormItems
}

export const AddPurchaseModal = () => {
  const [form] = Form.useForm()
  const [productVariantTab, setProductVariantTab] = useState<ProductVariantTabs>(
    ProductVariantTabs.SELECT_VARIANT,
  )

  const [createProduct] = useCreateProductMutation()
  const [createProductVariant] = useCreateProductVariantMutation()
  const [createPurchase] = useCreatePurchaseMutation()

  const [productTab, setProductTab] = useState<ProductTabs>(ProductTabs.SELECT_PRODUCT)

  const isCreateProductTab = productTab === ProductTabs.CREATE_PRODUCT

  const handleSubmit = async (formData: FormItems) => {
    let product_id = formData.product_id
    let product_variant_id = formData.product_variant_id

    try {
      if (productTab === ProductTabs.CREATE_PRODUCT) {
        product_id = (await createProduct(formData.product).unwrap())?.data?.id
      }

      if (productVariantTab === ProductVariantTabs.CREATE_VARIANT) {
        const { product_variants } = formData
        product_variant_id = (
          await createProductVariant({ product_id, ...product_variants }).unwrap()
        )?.data?.id
      }

      await createPurchase({ ...formData.purchase, product_variant_id })

      form.resetFields()
    } catch {
      message.error("Ошибка при попытке создать закуп")
    }
  }

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
      children: <ProductSelect withFormItems formItemProps={{ label: "Товар" }} />,
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
          {(productId) => (
            <ProductVariantSelect label={"Вариант"} productId={productId} key={productId} />
          )}
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
    <CustomModal title="Закуп" openButtonText="Создать закуп">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Flex vertical>
          <Tabs
            destroyOnHidden
            activeKey={productTab}
            items={selectProductTabs}
            onChange={(key) => handleChangeProductTab(key as ProductTabs)}
          />
          <Divider />
          <Tabs
            destroyOnHidden
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
