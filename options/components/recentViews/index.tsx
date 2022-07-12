import React, { useEffect, useState } from "react"

import { getLastSeen } from "~core/localStorage"

import "./index.css"

function RecentViews() {
  let [lastSeen, setLastSeen] = useState([])

  useEffect(() => {
    getLastSeen((lastSeen) => {
      let result = Object.keys(lastSeen)
        .map((value) => {
          return { ...lastSeen[value], threadID: value }
        })
        .sort((a, b) => {
          return Number(b.updateTime) - Number(a.updateTime)
        })
        .slice(0, 100) // select first 100 items.
      setLastSeen(result)
    })
  })

  return (
    <div>
      <h1>最近阅读</h1>
      <table className="recentViewsTable">
        <thead>
          <tr>
            <th>标题</th>
            <th>作者</th>
            <th>上次访问时间</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lastSeen.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.threadTitle || " "}</td>
                <td>{value.threadAuthor || " "}</td>
                <td>
                  {(value.updateTime &&
                    new Date(value.updateTime).toLocaleString()) ||
                    " "}
                </td>
                <td>
                  <a
                    href={`https://www.scboy.cc/?thread-${value.threadID}.htm`}
                    target="_blank">
                    打开
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export { RecentViews }
