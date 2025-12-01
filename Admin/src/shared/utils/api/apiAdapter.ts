import { supabase } from "../../configs"
import { Methods } from "../../constants"

type AdapterParams<P> = {
	table: string
	method: Methods
	payload?: P
	id?: number | string
}

type Response<T> = {
	data?: T
	error: unknown
}

export const apiAdapter = async <T, P = undefined>({
	table,
	method,
	payload,
	id,
}: AdapterParams<P>): Promise<Response<T>> => {
	try {
		let response

		switch (method) {
			case Methods.GET_ALL:
				response = await supabase.from(table).select("*")
				break

			case Methods.GET_BY_ID:
				if (!id) throw new Error("ID is required for GET_BY_ID")
				response = await supabase.from(table).select("*").eq("id", id).single()
				break

			case Methods.CREATE:
				if (!payload) throw new Error("Payload is required for CREATE")
				response = await supabase.from(table).insert(payload).select()
				break

			case Methods.UPDATE:
				if (!id || !payload) throw new Error("ID and payload required for UPDATE")
				response = await supabase.from(table).update(payload).eq("id", id).select()
				break

			case Methods.DELETE:
				if (!id) throw new Error("ID required for DELETE")
				response = await supabase.from(table).delete().eq("id", id).select()
				break

			default:
				throw new Error("Unknown method")
		}

		if (response.error) throw response.error
		return response.data
	} catch (error) {
		return { error }
	}
}
