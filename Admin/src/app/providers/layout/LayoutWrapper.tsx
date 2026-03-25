import { useState } from "react"
import { useSelector } from "react-redux"
import { Navbar } from "@shared"
import { Layout } from "antd"
import type { ReactNode } from "react"
import { getIsAuthenticatedSelector, LogoutButton } from "@modules"

import { useMenuItems } from "../../routes"
import classes from "./LayoutWrapper.module.scss"

const { Content, Sider } = Layout

type LayoutWrapperProps = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [collapsed, setCollapsed] = useState(true)
  const isAuthenticated = useSelector(getIsAuthenticatedSelector)
  const menuItemsList = useMenuItems()

  const toggleSider = () => setCollapsed(true)

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <Layout className={classes.layout}>
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        collapsible
        width={200}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <Navbar onCloseSidebar={toggleSider} items={menuItemsList} />
        <div style={{ position: "absolute", bottom: 16, width: "100%", padding: "0 8px" }}>
          <LogoutButton />
        </div>
      </Sider>
      <Content className={classes.content} onClick={toggleSider}>
        {children}
      </Content>
    </Layout>
  )
}
