import "./MainScreen.css";

import Header from "src/widgets/header/Header";
import LeftSide from "src/widgets/left-side/LeftSide";
import RepositoryHeader from "src/widgets/repository-header/RepositoryHeader";
import SuitesBlock from "src/widgets/suites-block/SuitesBlock";
import CasesBlock from "src/widgets/cases-block/CasesBlock";
import { SuiteType } from "@/types/UnitsType";

const MainScreen = () => {
  const nodeList: SuiteType[] = [
    {
      name: "Редактирование сообщений",
      childCount: 2
    },
    {
      name: "Список диалогов",
      childCount: 2
    },
    {
      name: "Диалог с собеседником",
      childCount: 2
    },
    {
      name: "Отправка сообщений собеседнику",
      childCount: 2
    }
  ];
  return (
    <div className="main-screen">
      <Header/>
      <div className="main-block">
        <LeftSide/>
        <main className="main-block__content">
          <RepositoryHeader repositoryName={"Lpr-Case"} suitesCount={10} casesCount={65}/>
          <div className="content__units">
            <SuitesBlock suites={nodeList}/>
            <CasesBlock headerTitle={"All cases"} cases={nodeList}/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainScreen;
