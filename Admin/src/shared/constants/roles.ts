export enum AppRole {
  ADMIN = "admin",
  MANAGER = "manager",
  PACKER = "packer",
}

export const HumanizeRoles: Record<AppRole, string> = {
  [AppRole.ADMIN]: "Админ",
  [AppRole.MANAGER]: "Менеджер",
  [AppRole.PACKER]: "Упаковщик"
}