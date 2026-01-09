import type { Database, ResponseAll } from "@shared"

export type Clients = Database["public"]["Tables"]["clients"]["Row"]

export type ClientsResponse = ResponseAll<Clients[]>

export type CreateClient = Partial<Omit<Clients, "id" | "created_at">>
