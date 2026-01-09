import {
  AddProductToRealizationForm,
  getRealizationIdSelector,
  ProductRealizationModule,
} from "@modules"

import { Divider, Flex } from "antd"

import { useSelector } from "react-redux"

import classes from "./AddProductToRealizationTab.module.scss"

export const AddProductToRealizationTab = () => {
  const realizationId = useSelector(getRealizationIdSelector)

  return (
    <Flex vertical>
      <AddProductToRealizationForm realizationId={realizationId} />
      <Divider />
      <div className={classes.container}>
        <ProductRealizationModule realizationId={realizationId} />
      </div>
    </Flex>
  )
}
