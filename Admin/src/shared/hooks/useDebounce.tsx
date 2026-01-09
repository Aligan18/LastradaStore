import { useRef } from "react"

export const useDebounce = <Args extends readonly unknown[]>(
  callback: (...args: Args) => void,
  delay = 500,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  return (...args: Args) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
