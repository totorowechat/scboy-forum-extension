import { SetStateAction, useState } from "react"

import { Storage, useStorage } from "@plasmohq/storage"

import { getActiveTabs } from "~core/tabs"


function IndexPopup() {
  const [data, setData] = useState("")

  const [text, setText] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <input
        onChange={(e) => {
          setData(e.target.value)
          test(setText)
          handshake("hello")
        }}
        value={data}
      />
      <p>{data}</p>
      <p>{text}</p>
    </div>
  )
}

const test = async (fn: { (value: SetStateAction<string>): void; (arg0: string): void }) => {
  const [tab] = await getActiveTabs()
  fn('123')
}

enum StorageKey {
  PeerState = "peer-state",
  IframeClick = "iframe-click",
  OpenHailing = "open-hailing",
  InboundHailing = "inbound-hailing"
}

const handshake = async (inboundHF: string) => {
  const storage = new Storage()
  await storage.set(StorageKey.InboundHailing, inboundHF)
  // chrome.runtime.openOptionsPage()
}

export default IndexPopup
