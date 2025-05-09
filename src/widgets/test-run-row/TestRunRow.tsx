import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import Checkbox from "@/shared/ui/checkbox/Checkbox";
import { TestRunStatusColorMap } from "@/types/ColorMaps";
import { GetAllTestRunsResponseType } from "@/types/UnitsType";

type TestRunRowProps = {
  testRun: GetAllTestRunsResponseType;
  isActiveCheckbox: boolean;
};

type PercentageType = {
  color: string;
  percentage: number;
  count: number;
};

const TestRunRow = ({ testRun, isActiveCheckbox }: TestRunRowProps) => {
  const navigate = useNavigate();
  const [statsPercentage, setStatsPercentage] = useState<PercentageType[]>([
    {
      color: "#747474",
      percentage: 100,
      count: 1,
    },
  ]);

  useEffect(() => {
    const total = testRun.testStatusesCount.reduce(
      (acc, status) => acc + status.count,
      0,
    );
    if (total === 0) return;
    const newStats = testRun.testStatusesCount.map((status) => ({
      color: status.statusColor,
      percentage: (status.count / total) * 100,
      count: status.count,
    }));

    setStatsPercentage(newStats);
  }, [testRun.testStatusesCount]);

  return (
    <div className="test-run__row">
      <div className="test-run__cell">
        <Checkbox isActiveMainCheckbox={isActiveCheckbox} />
      </div>
      <div className="test-run__cell">
        <button
          className="test-run__cell-button"
          onClick={() => navigate("/runs/" + testRun.testRunId)}
        >
          <div className="test-run__cell">{testRun.testRunName}</div>
        </button>
      </div>
      <div
        className="test-run__cell test-run__status"
        style={{
          backgroundColor: TestRunStatusColorMap[testRun.status],
        }}
      >
        {testRun.status}
      </div>
      <div className="test-run__cell test-run__bar">
        {statsPercentage.map((p, index) => (
          <div
            className="test-run__bar-item"
            key={p.color}
            style={{
              borderTopLeftRadius: index == 0 ? "10px" : 0,
              borderBottomLeftRadius: index == 0 ? "10px" : 0,
              borderBottomRightRadius:
                index == statsPercentage.length - 1 ? "10px" : 0,
              borderTopRightRadius:
                index == statsPercentage.length - 1 ? "10px" : 0,
              backgroundColor: p.color,
              width: `${p.percentage}%`,
            }}
          >
            {p.count}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestRunRow;
