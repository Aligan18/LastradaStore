import { useCreateProductMutation } from "src/modules/product"

export const PurchasePage = () => {
	const [mutate] = useCreateProductMutation()
	return (
		<div>
			<button onClick={() => mutate({ name: "hello", price: 1000, purchase_price: 1000 })}>
				Click
			</button>
		</div>
	)
}
