import { MessengerTypes, type MESSENGER, type Realization } from "../api"

type MessengerKeys = Pick<Realization, "instagram_account" | "whats_app_account">

export function deriveAccountByMessenger(
  data: MessengerKeys,
  messenger: MESSENGER,
  asObject?: false,
): string | null

export function deriveAccountByMessenger(
  data: MessengerKeys,
  messenger: MESSENGER,
  asObject: true,
): Partial<MessengerKeys>

export function deriveAccountByMessenger(
  data: MessengerKeys,
  messenger: MESSENGER,
  asObject: boolean = false,
) {
  const keyByMessenger: Record<MESSENGER, keyof MessengerKeys> = {
    [MessengerTypes.INSTAGRAM]: "instagram_account",
    [MessengerTypes.WHATS_APP]: "whats_app_account",
  }

  const key = keyByMessenger[messenger]
  const value = data[key]

  return asObject ? { [key]: value } : value
}
