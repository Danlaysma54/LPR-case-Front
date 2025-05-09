import "./RunPage.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
  ChartOptions,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { useNavigate, useParams } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import { getTestRunByIdMock } from "@/entites/TestRun/api/TestRunMock";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import { GetTestRunByIdResponseType } from "@/types/UnitsType";
import SelectedStatusesList, {
  calculateColorsForSuite,
  StatusCaseType,
} from "@/widgets/suites-statuses-list/SuitesStatusesList";

export type RunSuitesType = {
  suiteId: string;
  suiteName: string;
};

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const centerTextPlugin: Plugin = {
  id: "centerText",
  beforeDraw: (chart) => {
    const { width, height, ctx } = chart;
    ctx.restore();
    const fontSize = (height / 114).toFixed(2);
    ctx.font = `${fontSize}em sans-serif`;
    ctx.textBaseline = "middle";
    const text = chart.config.options.plugins?.centerText?.text || "";
    const textX = Math.round((width - ctx.measureText(text).width) / 2);
    const textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  },
};

ChartJS.register(centerTextPlugin);

const RunPage = () => {
  const { runId } = useParams<{ runId: string }>();
  const [testRun, setTestRun] = useState<GetTestRunByIdResponseType | null>(
    null,
  );
  const navigate = useNavigate();
  const [allCases, setAllCases] = useState<string[]>([]);
  const [allSuitesTree, setAllSuitesTree] = useState<RunSuitesType[]>([]);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());
  const [mainCheckbox, setMainCheckbox] = useState(false);
  const [caseMap, setCaseMap] = useState<Record<string, StatusCaseType[]>>({});
  const [doughnutData, setDoughnutData] = useState<{
    data: ChartData<"doughnut">;
    options: ChartOptions<"doughnut">;
  } | null>(null);

  useEffect(() => {
    getTestRunByIdMock().then((res) => {
      setTestRun(res);
      const cases: string[] = [];
      const newCaseMap: Record<string, StatusCaseType[]> = {};
      const suites: RunSuitesType[] = [];
      for (const suite of res.suites || []) {
        suites.push({
          suiteId: suite.suiteId,
          suiteName: suite.suiteName,
        });
        for (const testCase of suite.testCases) {
          newCaseMap[suite.suiteId] = newCaseMap[suite.suiteId] || [];
          newCaseMap[suite.suiteId].push({
            caseId: testCase.testCaseId,
            caseName: testCase.testCaseName,
            status: testCase.status,
            statusColor: testCase.statusColor,
          });
          cases.push(testCase.testCaseId);
        }
      }
      setAllSuitesTree(suites);
      setCaseMap(newCaseMap);
      setAllCases(cases);
    });
  }, [runId]);

  useEffect(() => {
    if (!testRun) return;

    const colorMap = new Map<string, number>();
    let total = 0;
    let passedCount = 0;

    for (const suite of testRun.suites || []) {
      const stats = calculateColorsForSuite(
        suite.testCases.map((el) => {
          total++;
          if (el.status.toLowerCase() === "passed") passedCount++;
          return {
            caseId: el.testCaseId,
            caseName: el.testCaseName,
            status: el.status,
            statusColor: el.statusColor,
          };
        }),
      );

      for (const { color, percentage } of stats) {
        colorMap.set(color, (colorMap.get(color) || 0) + percentage);
      }
    }

    const colors = Array.from(colorMap.keys());
    const percentages = Array.from(colorMap.values());

    const passedPercentage = total
      ? Math.round((passedCount / total) * 100)
      : 0;

    const data: ChartData<"doughnut"> = {
      labels: colors,
      datasets: [
        {
          data: percentages,
          backgroundColor: colors,
          hoverOffset: 4,
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        datalabels: {
          display: false,
        },
        centerText: {
          text: `${passedPercentage}%`,
        },
      },
    };

    setDoughnutData({ data, options });
  }, [testRun]);

  const onToggleSuite = (suiteId: string) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev);
      if (next.has(suiteId)) next.delete(suiteId);
      else next.add(suiteId);
      return next;
    });
  };

  return (
    <div className="run-page">
      <div className="run-page__left-side">
        <div className="run-page__header">
          <div className="run-page__header-navigation">
            <button
              className="run-page__header-button"
              onClick={() => navigate("/runs")}
            >
              <BackArrow />
            </button>
            <span>{testRun?.testRunName}</span>
          </div>
        </div>
        <p className="run-page__cases">Test cases</p>
        <div className="run-page__upper-line" />
        <div className="run-page__content">
          <div className="run-page__select-all">
            <Checkbox
              isActiveMainCheckbox={mainCheckbox}
              onChange={() => {
                setMainCheckbox(!mainCheckbox);
              }}
            />
            Select all
          </div>
          {testRun ? (
            <SelectedStatusesList
              selectedSuites={testRun?.suites.map((s) => s.suiteId)}
              selectedCases={allCases}
              allSuitesTree={allSuitesTree}
              casesMap={caseMap}
              expandedSuites={expandedSuites}
              onToggleSuite={onToggleSuite}
              isActiveMainCheckbox={mainCheckbox}
            />
          ) : null}
        </div>
      </div>
      <div className="run-page__right-side">
        <p className="run-page__label">Stats</p>
        {doughnutData ? (
          <Doughnut data={doughnutData.data} options={doughnutData.options} />
        ) : null}
      </div>
    </div>
  );
};

export default RunPage;
