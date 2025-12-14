import type { ThemeConfig } from "antd"

export const resetConfig: ThemeConfig = {
  components: {
    Form: {
      marginLG: 10,
    },
    Typography: {
      margin: 0,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
  },
}
