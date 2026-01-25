import { useState } from "react" // 1. Импортируем хук
import { Navbar } from "@shared"
import { Layout } from "antd"
import type { ReactNode } from "react"

import { menuItems } from "../../routes"
import classes from "./LayoutWrapper.module.scss"

const { Content, Sider } = Layout

type LayoutWrapperProps = {
  children: ReactNode
}

export const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleSider = () => setCollapsed(true)

  return (
    <Layout className={classes.layout}>
      <Sider
        breakpoint="md"
        collapsedWidth={0}
        collapsible
        width={200}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <Navbar onCloseSidebar={toggleSider} items={menuItems} />
      </Sider>
      <Content className={classes.content} onClick={toggleSider}>
        {children}
      </Content>
    </Layout>
  )
}
