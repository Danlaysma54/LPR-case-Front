import React from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import HandIcon from "@/assets/svgs/HandIcon";
import UpArrow from "@/assets/svgs/UpArrow";
import { RunSuitesType } from "@/pages/run-page/RunPage";
import Checkbox from "@/shared/ui/checkbox/Checkbox";

import "./SuitesStatusesList.css";

export interface StatusCaseType {
  caseId: string;
  caseName: string;
  status: string;
  statusColor: string;
  testSteps: {
    testStepId: string;
    testStepName: string;
    expectedResult: string;
    status: string;
    statusColor: string;
  }[];
}

interface SelectedSuitesListProps {
  selectedSuites: string[];
  selectedCases: string[];
  allSuitesTree: RunSuitesType[];
  casesMap: Record<string, StatusCaseType[]>;
  expandedSuites: Set<string>;
  onToggleSuite: (suiteId: string) => void;
  isActiveMainCheckbox: boolean;
  onModalOpen: (testCase: StatusCaseType) => void;
}

export function calculateColorsForSuite(cases: StatusCaseType[]): {
  color: string;
  percentage: number;
}[] {
  const list: {
    color: string;
    percentage: number;
  }[] = [];
  const total = cases.length;
  if (total === 0) return list;

  const colorCounts: Record<string, number> = {};

  for (const testCase of cases) {
    const color = testCase.statusColor;
    colorCounts[color] = (colorCounts[color] || 0) + 1;
  }

  const colorPercentages: Record<string, number> = {};
  for (const color in colorCounts) {
    colorPercentages[color] = (colorCounts[color] / total) * 100;
  }

  for (const color in colorPercentages) {
    list.push({
      color: color,
      percentage: colorPercentages[color],
    });
  }

  return list;
}

const SelectedStatusesList: React.FC<SelectedSuitesListProps> = ({
  selectedSuites,
  selectedCases,
  allSuitesTree,
  casesMap,
  expandedSuites,
  onToggleSuite,
  isActiveMainCheckbox,
  onModalOpen,
}) => {
  const findSuiteName = (nodes: RunSuitesType[], id: string): string | null => {
    for (const node of nodes) {
      if (node.suiteId === id) return node.suiteName;
    }
    return null;
  };

  return (
    <div className="create-plan__selected-list">
      {selectedSuites.map((suiteId) => {
        const name = findSuiteName(allSuitesTree, suiteId) || suiteId;
        const suiteCases = casesMap[suiteId] || [];
        if (suiteCases.length === 0) return null;
        const shownCases = suiteCases.filter((c) =>
          selectedCases.includes(c.caseId),
        );
        const isExpanded = expandedSuites.has(suiteId);

        const statsPercentage = calculateColorsForSuite(shownCases);
        return (
          <div key={suiteId} className="selected-suite-block">
            <div className="selected-cases-upper-side">
              <button
                type="button"
                className="selected-suite__name-part"
                onClick={() => onToggleSuite(suiteId)}
              >
                {isExpanded ? <UpArrow /> : <DownArrow />}
                <div className="selected-suite-title">{name}</div>
              </button>
              <div className="selected-suite__bar">
                {statsPercentage.map((p, index) => (
                  <div
                    className="test-run__bar-run-item"
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
                  />
                ))}
              </div>
            </div>
            {shownCases.length > 0 && isExpanded ? (
              <ul className="selected-cases-list">
                {shownCases.map((c) => (
                  <li key={c.caseId} className="selected-case">
                    <Checkbox isActiveMainCheckbox={isActiveMainCheckbox} />{" "}
                    <div className="selected-cases-list__line-wrapper">
                      <div className="selected-cases-list__line" />
                    </div>
                    <HandIcon />
                    <div
                      className="selected-cases-list__status"
                      style={{
                        backgroundColor: c.statusColor,
                      }}
                    >
                      {c.status}
                    </div>
                    <button
                      className="selected-case__title_wrapper"
                      onClick={() => onModalOpen(c)}
                    >
                      <p className="selected-case-title">{c.caseName}</p>{" "}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedStatusesList;
