import { apiAdapter, Tables, Methods } from "@shared"
import { productApi } from "../productApi"
import type { Product } from "../types"

const getProducts = productApi.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query<Product, void>({
			async queryFn() {
				const { data, error } = await apiAdapter<Product>({
					table: Tables.PRODUCTS,
					method: Methods.GET_ALL,
				})
				if (error) return { error }
				return { data }
			},
		}),
	}),
	overrideExisting: false,
})

export const { useGetProductsQuery } = getProducts
