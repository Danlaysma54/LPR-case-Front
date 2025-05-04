import "./MainScreen.css";

import { useEffect, useState } from "react";

import { useAppSelector } from "src/shared/hooks/ReduxHooks";
import CasesBlock from "src/widgets/cases-block/CasesBlock";
import RepositoryHeader from "src/widgets/repository-header/RepositoryHeader";
import SuitesBlock from "src/widgets/suites-block/SuitesBlock";

const MainScreen = () => {
  const projectResponse = useAppSelector(
    (state) => state["PROJECT_DATA_REDUCER"]?.data,
  );
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const [headerTitle, setHeaderTitle] = useState<string>("Сьют не выбран");

  useEffect(() => {
    if (openedSuite) {
      setHeaderTitle(openedSuite.suiteName);
    }
  }, [openedSuite]);
  return (
    <>
      <RepositoryHeader
        repositoryName={
          projectResponse?.project?.projectName
            ? projectResponse.project?.projectName
            : ""
        }
      />
      <div className="content__units">
        <SuitesBlock />
        <CasesBlock headerTitle={headerTitle} />
      </div>
    </>
  );
};

export default MainScreen;
