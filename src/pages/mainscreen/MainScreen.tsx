import "./MainScreen.css";

import { useEffect   } from "react";
import { mockProjectId } from "src/config/mockData";
import { getProjectByAction } from "src/entites/Project/model/ProjectActions";
import { useAppDispatch, useAppSelector } from "src/shared/hooks/ReduxHooks";
import CasesBlock from "src/widgets/cases-block/CasesBlock";
import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";
import RepositoryHeader from "src/widgets/repository-header/RepositoryHeader";
import SuitesBlock from "src/widgets/suites-block/SuitesBlock";

import { getProjectById } from "src/entites/Project/api/projectApi";

const MainScreen = () => {
  const dispatch = useAppDispatch()
  const project = useAppSelector((state) => state["PROJECT_DATA_REDUCER"]?.data )
  useEffect(() => {
    try {
      getProjectById(mockProjectId).then((res) => {
        dispatch(getProjectByAction(res))
      })
    } catch (error) {
      console.log(error)
    }
  }, []);
  return (
    <div className="main-screen">
      <Header/>
      <div className="main-block">
        <LeftSide/>
        <main className="main-block__content">
          <RepositoryHeader repositoryName={project?.projectName ? project.projectName: ""} suitesCount={10} casesCount={65}/>
          <div className="content__units">
            <SuitesBlock/>
            <CasesBlock headerTitle={"All cases"}/>
          </div>
        </main>
      </div>
    </div>
  )
};

export default MainScreen;
