import { apiAdapter, Methods, Tables } from "@shared"
import { productApi } from "../productApi"
import type { CreateProduct, Product } from "../types"

const createProduct = productApi.injectEndpoints({
	endpoints: (build) => ({
		createProduct: build.mutation<Product, CreateProduct>({
			async queryFn(payload) {
				const { data, error } = await apiAdapter<Product, CreateProduct>({
					table: Tables.PRODUCTS,
					method: Methods.CREATE,
					payload,
				})
				if (error) return { error }
				return { data }
			},
		}),
	}),
	overrideExisting: false,
})

export const { useCreateProductMutation } = createProduct
