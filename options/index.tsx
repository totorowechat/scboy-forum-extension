import React from "react"
import { MemoryRouter } from "react-router-dom"

import { Routing } from "./routes"

function OptionsIndex() {
  return (
    <MemoryRouter>
      <Routing />
    </MemoryRouter>
  )
}

export default OptionsIndex
