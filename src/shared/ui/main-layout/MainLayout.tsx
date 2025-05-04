import React, { useEffect } from "react";

import { mockProjectId } from "@/config/mockData";
import { getProjectById } from "@/entites/Project/api/projectApi";
import { getProjectByAction } from "@/entites/Project/model/ProjectActions";
import { useAppDispatch } from "@/shared/hooks/ReduxHooks";
import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      getProjectById({
        projectId: mockProjectId,
      }).then((res) => {
        dispatch(getProjectByAction(res));
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
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
