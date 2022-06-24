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
      <ul>
        <li>自动签到</li>
        <li>显示未读消息</li>
        <li>跳转上次阅读位置</li>
      </ul>
    </div>
  )
}

export default IndexPopup
