import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
// import { RecentViews } from "./RecentViews"


// import { About } from "./about"

export const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/recentViews" element={<RecentViews />} /> */}
  </Routes>
)