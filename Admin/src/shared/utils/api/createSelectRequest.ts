import type { SelectStructure } from "./types/api"

export const createSelectRequest = <T>(select: SelectStructure<T>): string => {
  return select
    .map((field) => {
      if (typeof field === "string") {
        return field
      }

      const [key, fields] = Object.entries(field)[0]
      return `${key}(${createSelectRequest(fields)})`
    })
    .join(", ")
}
