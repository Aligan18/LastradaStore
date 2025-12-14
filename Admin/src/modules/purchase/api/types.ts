import type { Database, ResponseAll } from "@shared"
import type { Product, ProductVariants } from "src/modules/product/api/types"

export type Purchase = Database["public"]["Tables"]["purchases"]["Row"]

export type FullPurchase = Purchase & {
  product_variants: ProductVariants & {
    products: Product
  }
}

export type FullPurchaseResponse = ResponseAll<FullPurchase[]>

export type CreatePurchase = Omit<Purchase, "id">
