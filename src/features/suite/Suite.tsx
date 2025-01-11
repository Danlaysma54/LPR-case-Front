import './Suite.css'

import React from "react";
import DownArrow from "src/assets/svgs/DownArrow";
import FolderIcon from "src/assets/svgs/FolderIcon";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from "src/entites/OneLevel/api/GetOneLevelData";
import { saveOpenedSuite } from "src/entites/OneLevel/model/OnelLevelActions";
import { useAppDispatch } from "src/shared/hooks/ReduxHooks";
import { GetOneLevelDataResponseType, SuiteType } from "src/types/UnitsType";

type SuiteProps = {
  suite: SuiteType
  suites: SuiteType[]
  setSuites:  React.Dispatch<React.SetStateAction<SuiteType[]>>
}
const Suite = ({
                 suite: suite,
                 suites: suites,
                 setSuites: setSuites
}: SuiteProps) => {
  const dispatch = useAppDispatch();

  function changeVisibility(suiteId: string): SuiteType[] {
    return suites.map((suite) => {
      if (suite.suiteId === suiteId) {
        return { ...suite, isOpened: !suite.isOpened };
      }
      return suite;
    });
  }
  function appendChildren(suiteId: string, children: GetOneLevelDataResponseType): SuiteType[] {
    return suites.map((suite) => {
      if (suite.suiteId === suiteId) {
        return { ...suite, children: children };
      }
      return suite;
    });
  }
  const openSuite = (suiteId: string) => {
    const updatedSuites = changeVisibility(suiteId);
    suite.isOpened = !suite.isOpened
    setSuites(updatedSuites);
    if (suite.isOpened) {
      localStorage.setItem("openedSuiteId", suite.suiteId)
      if (!suite.children) {
        getOneLevelSuite({
          projectId: mockProjectId,
          suiteId: suiteId
        }).then((response)=> {
          dispatch(saveOpenedSuite(response))
          const updatedSuites = appendChildren(suiteId, response );
          setSuites(updatedSuites);
        });
      }
    }
  };
  const drawSuiteChildren = (suites: SuiteType[]) => {
      return  suites.map((suite) => {
        return <Suite
          key={suite.suiteId}
          suite={suite}
          suites={suites}
          setSuites={setSuites}
        />
      })
  }

  return (
    <div>
      <button className="suite--btn" onClick={() => openSuite(suite.suiteId)}>
        <div className="suite">
          <div className="suite__left-side">
            {suite.isOpened ? <div className="suite__left-side--arrow"><DownArrow /></div> : null}
            <FolderIcon color={"#393939"} />
            <div className="suite__title">{suite.suiteName}</div>
          </div>
          <span className="suite__child-count">{suite.numberOfChild}</span>
        </div>
      </button>
      {suite.isOpened && suite.children?.suites ?
        <div className="suite__children">
          {drawSuiteChildren(suite.children.suites)}
        </div>
        : null
      }
    </div>
  )
}


export default Suite;