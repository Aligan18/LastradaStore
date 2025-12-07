import type { Size } from "@shared"

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
  purchase_price: number
}

export type ProductVariants = {
  id: number
  product_id: number
  size: Size
  colors: ProductColors
  sold: number
  remaining: number
  total_purchased: number
}

export type CreateProduct = Omit<Product, "created_at" | "id">
