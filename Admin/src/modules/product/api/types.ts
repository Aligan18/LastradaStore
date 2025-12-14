import type { ResponseAll, Size } from "@shared"

type ProductColors = {
  id: number
  name: string
  hex: string
}

export type Product = {
  id: number
  name: string
  description?: string
  price: number
  images?: string[]
  created_at: string
}

export type ProductsResponse = ResponseAll<Product[]>

export type ProductVariants = {
  id: number
  product_id: number
  size: Size
  colors: ProductColors
  sold: number
  remaining: number
  total_purchased: number
}

export type ProductVariantsResponse = ResponseAll<ProductVariants[]>

export type CreateProduct = Omit<Product, "created_at" | "id">

export type CreateProductVariant = Pick<ProductVariants, "size" | "product_id"> & {
  color_id: number
}
