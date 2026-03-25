import { useState } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router"
import { Button, Card, Flex, Form, Input, message, Typography } from "antd"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import { supabase } from "@shared"
import { getIsAuthenticatedSelector } from "@modules"
import { RoutePath } from "../../app/routes/constants/routePath"
import classes from "./LoginPage.module.scss"

type LoginFormValues = {
  email: string
  password: string
}

export const LoginPage = () => {
  const isAuthenticated = useSelector(getIsAuthenticatedSelector)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to={RoutePath.REALIZATION} replace />
  }

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    setLoading(false)

    if (error) {
      message.error("Неверный email или пароль")
      return
    }
  }

  return (
    <Flex justify="center" align="center" className={classes.container}>
      <Card className={classes.card}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          Вход в систему
        </Typography.Title>
        <Form<LoginFormValues>
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Неверный формат email" },
            ]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}
