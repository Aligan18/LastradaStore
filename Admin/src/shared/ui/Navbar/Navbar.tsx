import { Menu, type MenuProps } from "antd"
import type { ComponentProps } from "react"
import { useLocation, useNavigate } from "react-router"

type NavbarProps = {
  items: MenuProps["items"]
  onCloseSidebar: () => void
} & ComponentProps<typeof Menu>

export const Navbar = ({
  onCloseSidebar,
  items,
  theme = "dark",
  mode = "vertical",
}: NavbarProps) => {
  const { pathname: selectedKey } = useLocation()
  const navigate = useNavigate()

  return (
    <Menu
      theme={theme}
      mode={mode}
      selectedKeys={[selectedKey]}
      items={items}
      onClick={(info) => {
        navigate(info.key)
        onCloseSidebar()
      }}
    />
  )
}
