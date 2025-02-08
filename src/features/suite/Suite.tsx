import "./Suite.css";

import { saveRenderedSuites } from "@/entites/Suites/model/SuitesActions";
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
  depth?: number;
};

const Suite = ({ suite, depth = 0 }: SuiteProps) => {
  const offset = 1;
  const limit = 200; // TODO: когда нибудь не поленюсь сделать пагинацию
  const suites = useAppSelector(
    (state) => state["RENDERED_SUITES_REDUCER"]?.renderedSuites,
  );
  const dispatch = useAppDispatch();
  const openedSuites = useAppSelector((state) => state["SUITE_REDUCER"]?.data);
  function changeVisibility(
    newSuites: SuiteType[],
    suiteId: string,
  ): SuiteType[] {
    return newSuites.map((suite) => {
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
      if (suite.suiteId === suiteId && children != undefined) {
        return {
          ...suite,
          children: {
            ...children,
            suites: children.suites ?? [],
            cases: children.cases ?? [],
          },
        };
      }
      if (suite.children?.suites) {
        return {
          ...suite,
          children: {
            ...suite.children,
            suites: appendChildren(suite.children.suites, suiteId, children),
            cases: suite.children.cases ?? [],
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
        offset: offset,
        limit: limit,
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
    dispatch(saveRenderedSuites(updatedSuites));
    const currentSuite = findSuiteById(updatedSuites, suiteId);
    if (currentSuite?.isOpened) {
      getOneLevelSuite({
        projectId: mockProjectId,
        suiteId: suiteId,
        offset: offset,
        limit: limit,
      }).then((response) => {
        const updatedSuitesWithChildren = appendChildren(
          updatedSuites,
          suiteId,
          response,
        );
        dispatch(saveRenderedSuites(updatedSuitesWithChildren));
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

  const drawSuiteChildren = (children: SuiteType[]) => {
    return children.map((childSuite) => (
      <Suite key={childSuite.suiteId} suite={childSuite} depth={depth + 1} />
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
            <div style={{ marginLeft: `${depth * 5}px` }}>
              <UpArrow />
            </div>
          </button>
        </div>
      ) : null}
      {suite.hasChildSuites && !suite.isOpened ? (
        <div className="suite__left-side--arrow">
          <button
            className="arrow--btn"
            onClick={() => uncoverSuite(suite.suiteId, suite.suiteName)}
          >
            <div style={{ marginLeft: `${depth * 5}px` }}>
              <DownArrow />
            </div>
          </button>
        </div>
      ) : null}
      <div style={{ marginLeft: `${20}px`, paddingTop: "18px" }}>
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
          <div className="suite__list">
            {drawSuiteChildren(suite.children.suites)}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Suite;
