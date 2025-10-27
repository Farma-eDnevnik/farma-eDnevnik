import { createRouter } from "@tanstack/react-router"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)