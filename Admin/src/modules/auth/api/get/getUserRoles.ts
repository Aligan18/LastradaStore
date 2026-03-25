import { Methods, Tables, type ResponseAll } from "@shared"
import { authApi } from "../authApi"
import { AuthTags } from "../authTags"
import type { UserRole } from "../types"

type Params = { userId: string }

const getUserRoles = authApi.injectEndpoints({
  endpoints: (build) => ({
    getUserRoles: build.query<UserRole[], Params>({
      query: ({ userId }) => ({
        table: Tables.USER_ROLES,
        method: Methods.GET_ALL,
        params: {
          filter: (query) => query.eq("user_id", userId),
        },
        extraOptions: { errorMessage: "Ошибка при получении ролей пользователя" },
      }),
      providesTags: [AuthTags.USER_ROLES],
      transformResponse: (response: ResponseAll<UserRole[]>) => response.data,
    }),
  }),
  overrideExisting: false,
})

export const { useGetUserRolesQuery, useLazyGetUserRolesQuery } = getUserRoles
