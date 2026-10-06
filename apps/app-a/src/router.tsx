import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router';
import { Home } from '@/components/pages/Home/Home';
import { About } from '@/components/pages/About/About';

const rootRoute = createRootRoute({
  component: () => (
    <div className="mx-auto max-w-3xl p-6">
      <nav className="mb-6 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </div>
  ),
});

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
