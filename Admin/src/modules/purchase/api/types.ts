import type { Database } from "@shared"

export type Purchase = Database["public"]["Tables"]["purchases"]["Row"]

export type CreatePurchase = Omit<Purchase, "id">
