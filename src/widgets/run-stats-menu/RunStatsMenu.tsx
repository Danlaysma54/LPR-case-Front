import "./RunStatsMenu.css";
import { useEffect, useState } from "react";

import { getAllCaseStatusesMock } from "@/entites/TestRun/api/TestRunMock";
import { GetTestStatusesResponseType } from "@/types/UnitsType";
import { StatusCaseType } from "@/widgets/suites-statuses-list/SuitesStatusesList";
import CloseIcon from "src/assets/svgs/CloseIcon";
type RunStatsMenuProps = {
  onClose: () => void;
  testCase: StatusCaseType | undefined;
};

const RunStatsMenu = ({ onClose, testCase }: RunStatsMenuProps) => {
  const [statuses, setStatuses] = useState<GetTestStatusesResponseType>();

  useEffect(() => {
    getAllCaseStatusesMock().then().then(setStatuses);
  }, []);
  return (
    <div className="stats-menu">
      <CloseIcon className="stats-menu__close" onClose={onClose} />
      <p className="stats-menu__title">{testCase?.caseName}</p>
      <ul className="stats-menu__statuses">
        {statuses?.statuses.map((status) => {
          return (
            <li
              className="stats-menu__statuses-el"
              style={{
                backgroundColor: status.color,
              }}
              key={status.statusId}
            >
              <span
                className="stats-menu__icon"
                dangerouslySetInnerHTML={{ __html: status.svg }}
              />
              {status.statusName}
            </li>
          );
        })}
      </ul>
      <p className="stats-menu__steps-name">steps</p>
      <ul className="stats-menu__steps">
        {testCase?.testSteps.map((step, index) => {
          return (
            <li className="stats-menu__steps-el" key={step.testStepId}>
              <div className="stats-menu__top">
                <span className="stats-menu__index">{index + 1}</span>
                {step.testStepName}
              </div>
              <div className="stats-menu__content">
                <div className="stats-menu__content-statuses">
                  {statuses?.statuses.map((status) => {
                    return (
                      <div
                        className="stats-menu__content-status"
                        style={{ ["--status-color" as never]: status.color }}
                        key={status.statusId}
                      >
                        {status.statusName}
                      </div>
                    );
                  })}
                </div>
                <div className="stats-menu__expected-result">
                  <span className="stats-menu__expected-title">
                    Expected result
                  </span>
                  <p className="stats-menu__expected-value">
                    {step.expectedResult}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RunStatsMenu;
