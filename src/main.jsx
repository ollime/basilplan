import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./public/styles/style.css"
import "./public/styles/test.css"

import App from './App.jsx'
import Stats from "./pages/Stats.jsx"
import Settings from "./pages/Settings.jsx"

const getRidOfConsoleMessages = {
  v7_startTransition: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_relativeSplatPath: true,
  v7_skipActionErrorRevalidation: true,
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/stats",
    element: <Stats />
  },
  {
    path: "/settings",
    element: <Settings />
  },
], {future: getRidOfConsoleMessages})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider future={getRidOfConsoleMessages} router={router} />
  </StrictMode>,
)