import { Form, Input, message, type FormItemProps } from "antd"
import type { NamePath } from "antd/es/form/interface"

type InstagramInputProps = {
  groupName?: string
  formItemProps?: FormItemProps
  disabled?: boolean
}

const FIELD = "instagram_account"

const normalizeInstagramUrlToTag = (url: string) => {
  const isUrl = url.startsWith("https://www.instagram.com/")

  if (isUrl) {
    try {
      const { pathname } = new URL(url)

      return pathname.replace(/^\/|\/$/g, "").split("/")[0]
    } catch {
      message.error("Неверный url профиля")
    }
  }

  return url
}

const validateInstagram = (_: unknown, value: string): Promise<void> => {
  if (!value) return Promise.reject("Введите ссылку на Instagram")

  try {
    const username = value
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return Promise.reject("Недопустимые символы в имени профиля")
    }

    return Promise.resolve()
  } catch {
    return Promise.reject("Некорректная ссылка")
  }
}

export const InstagramInput = ({ groupName, formItemProps, disabled }: InstagramInputProps) => {
  const formName: NamePath = groupName ? [groupName, FIELD] : FIELD

  return (
    <Form.Item
      normalize={(value: string) => normalizeInstagramUrlToTag(value)}
      name={formName}
      rules={[{ validator: validateInstagram }]}
      {...formItemProps}>
      <Input disabled={disabled} placeholder="Instagram URL профиля" />
    </Form.Item>
  )
}
