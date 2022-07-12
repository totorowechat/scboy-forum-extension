import React from "react"
import { MemoryRouter } from "react-router-dom"
import { Routing } from "./routes"
import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  const [text, setText] = useState("")

  return (
    <MemoryRouter>
      <Routing />
    </MemoryRouter>
  )
}

export default IndexPopup
