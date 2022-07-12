import React from "react"

import "./recentViews.css"

function RecentViews() {
  return (
    <div>
      <h1>最近阅读</h1>
      <table className="recentViewsTable">
        <thead>
          <tr>
            <th>标题</th>
            <th>作者</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>我最近不玩论坛了。</td>
            <td>小丑黄</td>
            <th>
              <button>打开</button>
            </th>
          </tr>
          <tr>
            <td>我最近不玩论坛了。</td>
            <td>小丑黄</td>
            <th>
              <button>打开</button>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export { RecentViews }
