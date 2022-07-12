import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

export const Home = () => {
  const navigation: NavigateFunction = useNavigate()

  const onNextPage = (): void => {
    navigation("/recentViews")
  }

  return (
    // <div style={{ padding: 16 }}>
    //   <span>Home page</span>
    //   <button onClick={onNextPage}>About</button>
    // </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16,
        minWidth: "300px"
      }}>
      <h1
        style={{
          margin: "auto"
        }}>
        星际老男孩论坛插件
      </h1>
      <ul>
        <li>自动签到</li>
        <li>显示未读消息</li>
        <li>跳转上次阅读位置</li>
        <li
          onClick={() => {
            chrome.tabs.create({
              url: chrome.runtime.getManifest().options_ui.page + "?recentViews"
            })
          }}>
          最近阅读
        </li>
      </ul>
    </div>
  )
}