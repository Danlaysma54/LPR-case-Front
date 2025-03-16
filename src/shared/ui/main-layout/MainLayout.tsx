import { Outlet } from "react-router-dom";

import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";

const MainLayout = () => {
  return (
    <div className="main-screen">
      <Header />
      <div className="main-block">
        <LeftSide />
        <main className="main-block__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
