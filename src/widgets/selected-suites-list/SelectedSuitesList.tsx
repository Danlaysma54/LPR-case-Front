import React, { useEffect, useState } from "react";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import DownArrow from "@/assets/svgs/DownArrow";
import UpArrow from "@/assets/svgs/UpArrow";
import CaseInPlan from "@/shared/ui/case-in-plan/CaseInPlan";
import { CaseType } from "@/types/UnitsType";
import { GetAllSuitesByProjectIdSuitesType } from "@/widgets/select-cases-modal/SelectCasesModal";

interface SelectedSuitesListProps {
  selectedSuites: string[];
  selectedCases: string[];
  allSuitesTree: GetAllSuitesByProjectIdSuitesType[];
  casesMap: Record<string, CaseType[]>;
  expandedSuites: Set<string>;
  onToggleSuite: (suiteId: string) => void;
  onRemoveCase: (caseId: string) => void;
}

const SelectedSuitesList: React.FC<SelectedSuitesListProps> = ({
  selectedSuites,
  selectedCases,
  allSuitesTree,
  casesMap,
  expandedSuites,
  onToggleSuite,
  onRemoveCase,
}) => {
  const [renderedCases, setRenderedCases] = useState<Set<string>>(new Set());

  const findSuiteName = (
    nodes: GetAllSuitesByProjectIdSuitesType[],
    id: string,
  ): string | null => {
    for (const node of nodes) {
      if (node.suiteId === id) return node.suiteName;
      if (node.children) {
        const found = findSuiteName(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    selectedSuites.map((suiteId) => {
      const suiteCases = casesMap[suiteId] || [];
      if (suiteCases.length === 0) return null;
      const shownCases = suiteCases.filter((c) =>
        selectedCases.includes(c.caseId),
      );
      setRenderedCases((prev) => {
        const updated = new Set(prev);
        for (const c of shownCases) {
          updated.add(c.caseId);
        }
        return updated;
      });
    });
  }, [selectedSuites]);

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
        return (
          <div key={suiteId} className="selected-suite-block">
            <button
              type="button"
              className="selected-suite__name-part"
              onClick={() => onToggleSuite(suiteId)}
            >
              {isExpanded ? <UpArrow /> : <DownArrow />}
              <div className="selected-suite-title">{name}</div>
            </button>
            {shownCases.length > 0 && isExpanded ? (
              <ul className="selected-cases-list">
                {shownCases.map((c) => (
                  <li key={c.caseId} className="selected-case">
                    <button
                      className="delete-case__button"
                      type="button"
                      onClick={() => onRemoveCase(c.caseId)}
                    >
                      <DeleteIcon color={"#C03744"} />
                    </button>
                    <p className="selected-case-name">{c.caseName}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        );
      })}
      <ul className="selected-cases-only-list">
        {selectedCases.map((c) => {
          if (renderedCases && renderedCases?.has(c)) return null;
          return <CaseInPlan caseId={c} onRemoveCase={onRemoveCase} key={c} />;
        })}
      </ul>
    </div>
  );
};

export default SelectedSuitesList;
