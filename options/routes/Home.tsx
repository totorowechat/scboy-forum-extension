import React from "react"
import { NavigateFunction, useNavigate } from "react-router-dom"

import { RecentViews } from "~options/components/recentViews"

export const Home = () => {
  const navigation: NavigateFunction = useNavigate()
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
          margin: "auto"
        }}>
        星际老男孩论坛插件
      </h1>
      <h3>功能</h3>
      <ul>
        <li>自动签到</li>
        <li>显示未读消息</li>
        <li>跳转上次阅读位置</li>
        <li onClick={() => navigation("/recentViews")}>最近阅读</li>
      </ul>
    </div>
  )
}
