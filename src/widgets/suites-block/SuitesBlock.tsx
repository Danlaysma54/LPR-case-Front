import "./SuitesBlock.css";

import { useEffect, useState } from "react";
import MenuIcon from "src/assets/svgs/MenuIcon";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from "src/entites/OneLevel/api/GetOneLevelData";
import Suite from "src/features/suite/Suite";
import { SuiteType } from "src/types/UnitsType";

const SuitesBlock = () => {
  const [suites, setSuites] = useState<SuiteType[]>([]);
  const offset = 1;
  const limit = 200; // TODO: когда нибудь не поленюсь сделать пагинацию
  useEffect(() => {
    getOneLevelSuite({
      projectId: mockProjectId,
      suiteId: mockProjectId,
      offset: offset,
      limit: limit,
    }).then((response) => setSuites(response.suites));
  }, []);

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
                <Suite suite={suite} suites={suites} setSuites={setSuites} />
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SuitesBlock;
