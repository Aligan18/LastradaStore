import { useEffect } from "react"

type VisibilityCallback = (isVisible: boolean) => void

/**
 * Хук для отслеживания видимости страницы (возврат на вкладку)
 * @param callback - функция, которая вызывается при изменении видимости
 */
export const usePageVisibility = (callback: VisibilityCallback) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      callback(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Вызываем callback при монтировании, если страница видима
    if (!document.hidden) {
      callback(true)
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [callback])
}
