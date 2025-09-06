// src/routes.tsx
import ErrorPage from "../components/error/ErrorPage";
import Layout from "../layouts/Layout";
import SynthOne from "../components/synthone/synthone";

import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ path: "", element: <SynthOne /> }],
  },
];
