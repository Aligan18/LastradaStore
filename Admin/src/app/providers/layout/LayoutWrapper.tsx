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
	return (
		<Layout className={classes.layout}>
			<Sider width={200}>
				<Navbar items={menuItems} />
			</Sider>
			<Content className={classes.content}>{children}</Content>
		</Layout>
	)
}
