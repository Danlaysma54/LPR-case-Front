import { useEffect, useState } from "react";

import { getAllTestRunsMock } from "@/entites/TestRun/api/TestRunMock";
import { GetAllTestRunsResponseType } from "@/types/UnitsType";

import TestRunRow from "@/widgets/test-run-row/TestRunRow";
import "./TestRun.css";

const TestRun = () => {
  const [testRuns, setTestRuns] = useState<GetAllTestRunsResponseType[]>([]);
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  useEffect(() => {
    getAllTestRunsMock().then((res) => setTestRuns(res));
  }, []);

  return (
    <div className="test-run">
      <div className="test-run__header"> Test Runs</div>
      <div className="test-run__content">
        <div className="test-run__row test-run__row--header">
          <div className="test-run__cell">
            <input
              type="checkbox"
              onClick={() => setIsActiveCheckbox(!isActiveCheckbox)}
              className="test-run__checkbox"
            />
          </div>
          <div className="test-run__cell">TITLE</div>
          <div className="test-run__cell">STATUS</div>
          <div className="test-run__cell">TEST RUN STATS</div>
        </div>
        {testRuns.map((testRun) => (
          <TestRunRow
            key={testRun.testRunId}
            testRun={testRun}
            isActiveCheckbox={isActiveCheckbox}
          />
        ))}
      </div>
    </div>
  );
};

export default TestRun;
