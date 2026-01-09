import type { ThemeConfig } from "antd"

export const resetConfig: ThemeConfig = {
  components: {
    Form: {
      marginLG: 5,
    },
    Typography: {
      margin: 0,
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Divider: {
      margin: 5,
    },
    Select: {
      colorTextSecondary: "#000000",
      colorText: "#000000",
    },
    Input: { colorText: "#000000" },
  },
}
