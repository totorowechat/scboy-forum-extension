import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { getLastSeen, setLastSeen } from "~core/local-storage"

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
  const regex = /\?thread-(\d+)-?\d*\.htm/
  return window.location.search.match(regex)[1]
}

const getCurrThreadPage = function () {
  const regex = /\?thread-\d+-?(\d*)\.htm/
  return window.location.search.match(regex)[1]
}

const getCurrPostFloor = function (ele: HTMLElement) {
  let floor = ele.querySelector(".floor-parent") as HTMLElement | null
  return floor.innerText.split("楼")[0]
}

// window.addEventListener("load", () => {
console.log("scboy forum extension thread loaded")
const storage = new Storage()

let postsHeight = getPostsHeight(getAllPosts())

document.addEventListener(
  "scroll",
  debounce(function (_e) {
    let lastKnownScrollPosition = window.scrollY + window.innerHeight
    //   console.log(lastKnownScrollPosition)

    // find first element higher than current position, choose last if not found

    let postIndex = postsHeight.findIndex(
      (post) => post.height > lastKnownScrollPosition
    )

    if (postIndex === -1) postIndex = postsHeight.length - 1
    //   console.log(postsHeight[postIndex].element.getAttribute("data-pid"))
    let currPage = "1"
    if (getCurrThreadPage() !== "") currPage = getCurrThreadPage()
    getLastSeen(storage, "last_seen_tids", (lastSeen) => {
      if (lastSeen === null) lastSeen = {}

      lastSeen[getThreadID()] = {
        page: currPage,
        post:
          postsHeight[postIndex] &&
          postsHeight[postIndex].element.getAttribute("data-pid"),
        floor: getCurrPostFloor(postsHeight[postIndex].element)
      }

      setLastSeen(storage, "last_seen_tids", lastSeen)
    })
  }, 500)
)
// })
