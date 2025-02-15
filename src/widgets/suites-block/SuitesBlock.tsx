import "./SuitesBlock.css";

import { useEffect } from "react";

import { saveRenderedSuites } from "@/entites/Suites/model/SuitesActions";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import MenuIcon from "src/assets/svgs/MenuIcon";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from "src/entites/OneLevel/api/GetOneLevelData";
import Suite from "src/features/suite/Suite";

const SuitesBlock = () => {
  const suites = useAppSelector(
    (state) => state["RENDERED_SUITES_REDUCER"]?.renderedSuites,
  );
  const dispatch = useAppDispatch();
  const offset = 1;
  const limit = 200; // TODO: когда нибудь не поленюсь сделать пагинацию
  useEffect(() => {
    getOneLevelSuite({
      projectId: mockProjectId,
      suiteId: mockProjectId,
      offset: offset,
      limit: limit,
    }).then((response) => {
      if (response.suites) {
        dispatch(saveRenderedSuites(response.suites));
      }
    });
  }, [dispatch]);

  return (
    <div className="suites-block">
      <div className="suites-block__header">
        <MenuIcon />
        <div className="suites-block__title">Suites</div>
      </div>
      <ul className="suites-block__suites-list">
        {suites.map((suite) => {
          return (
            <div key={suite.suiteId} className="suites-list__wrapper">
              <li className="suites-list--el">
                <Suite suite={suite} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SuitesBlock;
