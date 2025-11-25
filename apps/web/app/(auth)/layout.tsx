import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen h-full min-w-screen flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
