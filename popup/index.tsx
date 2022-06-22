import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const [text, setText] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        minWidth: "300px"
      }}>
      <h1
        style={{
          margin: 'auto'
        }}>
        星际老男孩论坛插件
      </h1>
    </div>
  )
}

export default IndexPopup
