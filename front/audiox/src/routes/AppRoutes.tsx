import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

function AppRoutes(): React.JSX.Element {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
