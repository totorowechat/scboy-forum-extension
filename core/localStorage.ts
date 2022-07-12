export const getLastSeen = (fn) => {
  chrome.storage.local.get(["last_seen_tids"], function (result) {
    fn(result.last_seen_tids)
  })
}
export const setLastSeen = (value: string) => {
  chrome.storage.local.set({ last_seen_tids: value }, function () {
  })
}
