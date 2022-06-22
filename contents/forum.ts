import type { PlasmoContentScript } from "plasmo"

export const config: PlasmoContentScript = {
  matches: ["https://*.scboy.cc/*"]
}

// export const getMountPoint = async () => document.querySelectorAll("a.xs-thread-a")

// const PlasmoPricingExtra = () => {
//   return (
//     <span
//     //   style={{
//     //     background: "white",
//     //     padding: 12
//     //   }}
//       >
//       HELLO WORLD
//     </span>
//   )
// }

// export default PlasmoPricingExtra
export {}
window.addEventListener("load", () => {
  console.log("scboy forum extension loaded")
  const style = document.createElement("style")
  style.innerHTML = `
      .scboy-forum-extension-last-seen {
        border: 1px solid;
        border-radius: 50%;
        margin: 0 0.5rem;
        font-size: 0.78rem;
        line-height: 1rem;
        vertical-align: text-top;
        padding: 3px;
      }
    `
  document.head.appendChild(style)

  document.querySelectorAll("a.xs-thread-a").forEach((ele) => {
    let link = document.createElement("a")
    let linkText = document.createTextNode("上")
    link.className="scboy-forum-extension-last-seen"
    link.appendChild(linkText)
    link.href = "http://google.com"
    ele.after(link)
  })
  //   document.body.style.background = "pink"
})
