import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { getLastSeen } from "~core/localStorage"
import { getThreadID } from "~core/utils"

export const config: PlasmoContentScript = {
  matches: ["https://*.scboy.cc/?forum*"]
}

const getElementTID = function (element: HTMLElement) {
  return getThreadID(element.getAttribute("href"))
}

const getPostsCount = function (element: HTMLElement) {
  return parseInt(
    (
      element.querySelector(
        ".text-muted.small > span:nth-child(3)"
      ) as HTMLElement
    ).innerText
  )
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
      .scboy-forum-extension-unread {
        /* font-size: 0.8rem; */
        color: #1f4977;
        margin-left: 0.2rem;
      }
    `
document.head.appendChild(style)

document
  .querySelectorAll(".media.thread.tap")
  .forEach((thread: HTMLElement) => {
    let title = thread.querySelector("a.xs-thread-a") as HTMLElement

    // add last seen button.
    let link = document.createElement("a")
    let linkText = document.createTextNode("上")
    link.className = "scboy-forum-extension-last-seen"

    // add unread number
    let unread = document.createElement("span")
    unread.className = "scboy-forum-extension-unread"

    getLastSeen(storage, "last_seen_tids", (lastSeen) => {
      let tid = getElementTID(title)
      if (lastSeen[tid] !== undefined) {
        let { page, post, floor } = lastSeen[tid]

        // last seen
        link.appendChild(linkText)
        link.href = `https://www.scboy.cc/?thread-${tid}-${page}.htm#${post}`

        //unread
        unread.appendChild(
          document.createTextNode(
            floor ? `(+${getPostsCount(thread) - floor + 1})` : "未知"
          )
        )

        // append elements
        title.after(link)
        title.after(unread)
      }
    })
  })
// })
