import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"


export const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
)