import { Form } from "antd"
import type { ComponentProps, ReactNode } from "react"

type FormWrapperProps = {
  withoutForm?: boolean
  children: ReactNode
} & ComponentProps<typeof Form>

export const FormWrapper = ({ withoutForm = false, children, ...props }: FormWrapperProps) =>
  withoutForm ? children : <Form {...props}>{children}</Form>
