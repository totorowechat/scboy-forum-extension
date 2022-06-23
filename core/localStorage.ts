import type { Storage } from "@plasmohq/storage"

export const getLastSeen = async (storage: Storage, key: string, fn) => {
  let lastSeen = await storage.get(key)

  fn(lastSeen)
}
export const setLastSeen = async (
  storage: Storage,
  key: string,
  value: string
) => {
  await storage.set(key, value)
}
