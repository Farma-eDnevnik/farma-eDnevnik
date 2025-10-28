import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div>
      <nav>
        {/* Navigation */}
      </nav>
      <Outlet />
    </div>
  ),
})