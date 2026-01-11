import type { Database, ResponseAll } from "@shared"
import type { Product, ProductVariants } from "src/modules/product/api/types"

export type RealizationItems = Database["public"]["Tables"]["realization_items"]["Row"]
export type Realization = Database["public"]["Tables"]["realizations"]["Row"]
export type REALIZATION_STATUS = Database["public"]["Enums"]["realization_status"]
export type REALIZATION_STEPS = Database["public"]["Enums"]["realization_steps"]
export type MESSENGER = Database["public"]["Enums"]["messenger_type"]

export const MessengerTypes = {
  WHATS_APP: "WhatsApp",
  INSTAGRAM: "Instagram",
} as const

export const RealizationStatus: Record<Uppercase<REALIZATION_STATUS>, REALIZATION_STATUS> = {
  ACTIVE: "active",
  PACKAGE: "package",
  FINISHED: "finished",
  DELIVERY: "delivery",
}

export const RealizationSteps = {
  ADD_PRODUCTS: "add_products",
  CLIENT_INFO: "client_info",
  PAYMENT: "payment",
} as const

export type FullRealization = Realization & {
  realization_items: FullRealizationItems[]
}

export type FullRealizationItems = RealizationItems & {
  products: Product
  product_variants: ProductVariants
}
export type FullRealizationItemsResponse = ResponseAll<FullRealizationItems[]>

export type RealizationResponse = ResponseAll<Realization[]>
export type RealizationSingleResponse = ResponseAll<Realization>

export type CreateRealizationItems = Partial<Omit<RealizationItems, "id">>
export type CreateRealization = Partial<Omit<Realization, "id">>
