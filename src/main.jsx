/** @file Main react server. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./pages/App.jsx";
import Settings from "./pages/Settings.jsx";
import Stats from "./pages/Stats.jsx";
import TaskManager from "./pages/TaskManager.jsx";
import "./styles/style.css";
import "./styles/theme.css";

// removes error message
const getRidOfConsoleMessages = {
  v7_startTransition: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_relativeSplatPath: true,
  v7_skipActionErrorRevalidation: true
};

// allows for navigation between pages
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />
    },
    {
      path: "/tasks",
      element: <TaskManager />
    },
    {
      path: "/stats",
      element: <Stats />
    },
    {
      path: "/settings",
      element: <Settings />
    }
  ],
  { future: getRidOfConsoleMessages }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider future={getRidOfConsoleMessages} router={router} />
  </StrictMode>
);
