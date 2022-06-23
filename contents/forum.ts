import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { getLastSeen } from "~core/local-storage"
import { getThreadID } from "~core/utils"

export const config: PlasmoContentScript = {
  matches: ["https://*.scboy.cc/?forum*"]
}

const getElementTID = function (element: HTMLElement) {
  return getThreadID(element.getAttribute("href"))
}

// window.addEventListener("load", () => {
  console.log("scboy forum extension loaded")

  const storage = new Storage()

  const style = document.createElement("style")
  style.innerHTML = `
      .scboy-forum-extension-last-seen {
        border: 1px solid;
        /* border-radius: 50%; */
        margin: 0 0.5rem;
        font-size: 0.78rem;
        line-height: 1rem;
        /* vertical-align: text-top; */
        padding: 3px;
      }
    `
  document.head.appendChild(style)

  document.querySelectorAll("a.xs-thread-a").forEach((ele: HTMLElement) => {
    let link = document.createElement("a")
    let linkText = document.createTextNode("上")
    link.className = "scboy-forum-extension-last-seen"

    getLastSeen(storage, "last_seen_tids", (lastSeen) => {
      let tid = getElementTID(ele)
      if (lastSeen[tid] !== undefined) {
        let { page, post } = lastSeen[tid]
        link.appendChild(linkText)
        link.href = `https://www.scboy.cc/?thread-${tid}-${page}.htm#${post}`
        ele.after(link)
      }
    })
  })
// })
