import React from "react";

import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="main-screen">
      <Header />
      <div className="main-block">
        <LeftSide />
        <main className="main-block__content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
