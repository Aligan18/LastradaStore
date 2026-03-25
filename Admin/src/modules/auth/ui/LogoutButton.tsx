import { Button } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import { supabase } from "@shared"

export const LogoutButton = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Button
      type="text"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      style={{ color: "rgba(255, 255, 255, 0.65)", width: "100%" }}>
      Выход
    </Button>
  )
}
