import React from "react";
import { Outlet } from "react-router-dom";

const Layout = (): React.JSX.Element => {
  return (
    <div>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
