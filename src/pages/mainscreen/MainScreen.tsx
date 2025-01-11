import "./MainScreen.css";

import { useEffect, useState } from "react";
import { mockProjectId } from "src/config/mockData";
import { getProjectById } from "src/entites/Project/api/projectApi";
import { getProjectByAction } from "src/entites/Project/model/ProjectActions";
import { useAppDispatch, useAppSelector } from "src/shared/hooks/ReduxHooks";
import CasesBlock from "src/widgets/cases-block/CasesBlock";
import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";
import RepositoryHeader from "src/widgets/repository-header/RepositoryHeader";
import SuitesBlock from "src/widgets/suites-block/SuitesBlock";

const MainScreen = () => {
  const dispatch = useAppDispatch()
  const projectResponse = useAppSelector((state) => state["PROJECT_DATA_REDUCER"]?.data )
  const openedSuites = useAppSelector((state) => state["ONE_LEVEL_REDUCER"]?.data)
  const [headerTitle, setHeaderTitle] = useState<string>("None")
  useEffect(() => {
    try {
      getProjectById( {
        projectId: mockProjectId
      }).then((res) => {
        dispatch(getProjectByAction(res))
      })
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    const openedSuiteId = localStorage.getItem("openedSuiteId")
    if (openedSuiteId) {
      const openedSuite = openedSuites?.find((el) => {
        return el.suiteId == openedSuiteId
      })
      console.log(openedSuites);
      if (openedSuite) {
        setHeaderTitle(openedSuite.suiteName)
      }
    }
  }, [openedSuites]);
  return (
    <div className="main-screen">
      <Header/>
      <div className="main-block">
        <LeftSide/>
        <main className="main-block__content">
          <RepositoryHeader repositoryName={
                            projectResponse?.project?.projectName ? projectResponse.project?.projectName: ""}
                            suitesCount={projectResponse?.suitesCount ? projectResponse.suitesCount: 0}
                            casesCount={projectResponse?.casesCount ? projectResponse.casesCount: 0}/>
          <div className="content__units">
            <SuitesBlock/>
            <CasesBlock headerTitle={headerTitle}/>
          </div>
        </main>
      </div>
    </div>
  )
};

export default MainScreen;
