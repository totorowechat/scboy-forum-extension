import React from "react"
import { Route, Routes } from "react-router-dom"
import { RecentViews } from "~options/components/recentViews"
import { Home } from "./Home"



export const Routing = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/recentViews" element={<RecentViews />} />
  </Routes>
)