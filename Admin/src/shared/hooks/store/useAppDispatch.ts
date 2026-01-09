import type { AppDispatch } from "@app"
import { useDispatch } from "react-redux"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
