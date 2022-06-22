import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  matches: ["https://*.scboy.cc/?thread*"]
}

const debounce = function (
  func: { (_e: any): void; apply?: any },
  delay: number
) {
  let timer: NodeJS.Timeout
  return function () {
    //anonymous function
    const context = this
    const args = arguments
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

const getOffset = function (el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}

const convertRemToPixels = function (rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

const getAllPosts = function (): NodeListOf<HTMLElement> {
  return document.querySelectorAll(".media.post:not(.newpost)")
}

const getPostsHeight = function (list: NodeListOf<HTMLElement>) {
  let result: Array<{ height: number; element: HTMLElement }> = []
  list.forEach((ele) => {
    result.push({ height: getOffset(ele).top, element: ele })
  })

  return result.sort((a, b) => a.height - b.height)
}

const getThreadID = function () {
  const regex = /\?thread-([0-9]+)\.htm/
  return window.location.search.match(regex)[1]
}

const getLastSeen = async (storage: Storage, key: string, fn) => {
  let lastSeen = await storage.get(key)

  fn(lastSeen)
}
const setLastSeen = async (storage: Storage, key: string, value: string) => {
  await storage.set(key, value)
  // chrome.runtime.openOptionsPage()
}

window.addEventListener("load", () => {
  console.log("scboy forum extension thread loaded")
  const storage = new Storage()

  let postsHeight = getPostsHeight(getAllPosts())
  document.addEventListener(
    "scroll",
    debounce(function (_e) {
      let lastKnownScrollPosition = window.scrollY + window.innerHeight
      console.log(lastKnownScrollPosition)

      // find first element higher than current position, choose last if not found

      let postIndex = postsHeight.findIndex(
        (post) => post.height + convertRemToPixels(5) > lastKnownScrollPosition
      )

      if (postIndex === -1) postIndex = postsHeight.length - 1
      //   console.log(postsHeight[postIndex].element.getAttribute("data-pid"))

      getLastSeen(storage, "last_seen_tids", (lastSeen) => {
        if (lastSeen === null) lastSeen = {}

        lastSeen[getThreadID()] =
          postsHeight[postIndex].element.getAttribute("data-pid")

        setLastSeen(storage, "last_seen_tids", lastSeen)
      })
    }, 500)
  )
})
