import type { Database } from "@shared"
import type { Product, ProductVariants } from "src/modules/product/api/types"

export type Purchase = Database["public"]["Tables"]["purchases"]["Row"]

export type FullPurchase = Purchase & {
  product_variants: ProductVariants & {
    products: Product
  }
}

export type CreatePurchase = Omit<Purchase, "id">
