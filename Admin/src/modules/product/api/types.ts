import type { Database, ResponseAll, Size } from "@shared"

export type Colors = Database["public"]["Tables"]["colors"]["Row"]
export type SIZES = Database["public"]["Enums"]["size"]

type ProductColors = {
  id: number
  name: string
  hex: string
}

export const ProductSizes: Record<Uppercase<SIZES>, SIZES> = {
  STD: "STD",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  "2XL": "2XL",
} as const

export type Product = {
  id: number
  name: string
  description?: string
  price: number
  images?: string[]
  created_at: string
}

export type ProductsResponse = ResponseAll<Product[]>

export type ColorsResponse = ResponseAll<Colors[]>

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
