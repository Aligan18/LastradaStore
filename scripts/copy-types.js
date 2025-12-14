import { copyFileSync, mkdirSync } from "fs"
import { dirname } from "path"

const targets = [
  "Admin/src/shared/types/supabase.types.ts",
]

for (const target of targets) {
  const dir = dirname(target)
  mkdirSync(dir, { recursive: true })

  try {
    copyFileSync("supabase.types.ts", target)
    console.log(`✔ Copied to: ${target}`)
  } catch (err) {
    console.error(`✖ Failed to copy to: ${target}`, err)
  }
}