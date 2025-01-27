import "./Suite.css";

import React from "react";

import DownArrow from "src/assets/svgs/DownArrow";
import FolderIcon from "src/assets/svgs/FolderIcon";
import UpArrow from "src/assets/svgs/UpArrow";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from "src/entites/OneLevel/api/GetOneLevelData";
import {
  saveOpenedSuite,
  saveOpenedSuites,
} from "src/entites/OneLevel/model/OnelLevelActions";
import { useAppDispatch, useAppSelector } from "src/shared/hooks/ReduxHooks";
import { GetOneLevelDataResponseType, SuiteType } from "src/types/UnitsType";

type SuiteProps = {
  suite: SuiteType;
  suites: SuiteType[];
  setSuites: React.Dispatch<React.SetStateAction<SuiteType[]>>;
  depth?: number;
};

const Suite = ({ suite, suites, setSuites, depth = 0 }: SuiteProps) => {
  const dispatch = useAppDispatch();
  const openedSuites = useAppSelector((state) => state["SUITE_REDUCER"]?.data);
  function changeVisibility(suites: SuiteType[], suiteId: string): SuiteType[] {
    return suites.map((suite) => {
      if (suite.suiteId === suiteId) {
        return { ...suite, isOpened: !suite.isOpened };
      }
      if (suite.children?.suites) {
        return {
          ...suite,
          children: {
            ...suite.children,
            suites: changeVisibility(suite.children.suites, suiteId),
          },
        };
      }
      return suite;
    });
  }

  function appendChildren(
    suites: SuiteType[],
    suiteId: string,
    children: GetOneLevelDataResponseType,
  ): SuiteType[] {
    return suites.map((suite) => {
      if (suite.suiteId === suiteId) {
        return { ...suite, children: children };
      }
      if (suite.children?.suites) {
        return {
          ...suite,
          children: {
            ...suite.children,
            suites: appendChildren(suite.children.suites, suiteId, children),
          },
        };
      }
      return suite;
    });
  }

  function findSuiteById(
    suites: SuiteType[],
    suiteId: string,
  ): SuiteType | undefined {
    for (const suite of suites) {
      if (suite.suiteId === suiteId) {
        return suite;
      }
      if (suite.children?.suites) {
        const found = findSuiteById(suite.children.suites, suiteId);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  const chooseSuite = (suiteId: string, suiteName: string) => {
    const suite = openedSuites.find((el) => el.suiteId === suiteId);
    if (suite) {
      dispatch(saveOpenedSuite(suite));
    } else {
      getOneLevelSuite({
        projectId: mockProjectId,
        suiteId: suiteId,
      }).then((response) => {
        dispatch(
          saveOpenedSuite({
            cases: response.cases,
            suites: response.suites,
            suiteId: suiteId,
            suiteName: suiteName,
          }),
        );
      });
    }
  };

  function uncoverSuite(suiteId: string, suiteName: string) {
    const updatedSuites = changeVisibility(suites, suiteId);
    setSuites(updatedSuites);

    const currentSuite = findSuiteById(updatedSuites, suiteId);
    if (currentSuite?.isOpened) {
      if (!currentSuite.children) {
        getOneLevelSuite({
          projectId: mockProjectId,
          suiteId: suiteId,
        }).then((response) => {
          const updatedSuitesWithChildren = appendChildren(
            updatedSuites,
            suiteId,
            response,
          );
          setSuites(updatedSuitesWithChildren);
          dispatch(
            saveOpenedSuites({
              cases: response.cases,
              suites: response.suites,
              suiteId: suiteId,
              suiteName: suiteName,
            }),
          );
        });
      }
    }
  }

  const drawSuiteChildren = (children: SuiteType[]) => {
    return children.map((childSuite) => (
      <Suite
        key={childSuite.suiteId}
        suite={childSuite}
        suites={suites}
        setSuites={setSuites}
        depth={depth + 1}
      />
    ));
  };
  return (
    <>
      {suite.hasChildSuites && suite.isOpened ? (
        <div className="suite__left-side--arrow">
          <button
            className="arrow--btn"
            onClick={() => uncoverSuite(suite.suiteId, suite.suiteName)}
          >
            <UpArrow />
          </button>
        </div>
      ) : null}
      {suite.hasChildSuites && !suite.isOpened ? (
        <div className="suite__left-side--arrow">
          <button
            className="arrow--btn"
            onClick={() => uncoverSuite(suite.suiteId, suite.suiteName)}
          >
            <DownArrow />
          </button>
        </div>
      ) : null}
      <div style={{ marginLeft: `${depth * 20}px`, paddingTop: "18px" }}>
        <div className="suite">
          <div className="suite__left-side">
            <button
              className="suite--btn"
              onClick={() => chooseSuite(suite.suiteId, suite.suiteName)}
            >
              <FolderIcon color={"#393939"} />
              <div className="suite__title">{suite.suiteName}</div>
            </button>
          </div>
        </div>
        {suite.isOpened && suite.children?.suites ? (
          <div>{drawSuiteChildren(suite.children.suites)}</div>
        ) : null}
      </div>
    </>
  );
};

export default Suite;
