import "./SelectCasesModal.css";
import { useEffect, useState, useCallback } from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import FolderIcon from "@/assets/svgs/FolderIcon";
import HandIcon from "@/assets/svgs/HandIcon";
import UpArrow from "@/assets/svgs/UpArrow";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import Button from "@/shared/ui/button/Button";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Search from "@/shared/ui/search/Search";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from "src/entites/OneLevel/api/GetOneLevelData";
import { CaseType } from "src/types/UnitsType";

type CheckedSet = {
  suites: Set<string>;
  cases: Set<string>;
};

export type GetAllSuitesByProjectIdSuitesType = {
  suiteName: string;
  suiteId: string;
  children?: GetAllSuitesByProjectIdSuitesType[];
};

type SelectCasesModalProps = {
  closeModal?: () => void;
};

const SelectCasesModal = ({ closeModal }: SelectCasesModalProps) => {
  const [tree, setTree] = useState<GetAllSuitesByProjectIdSuitesType[]>([]);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());
  const [casesMap, setCasesMap] = useState<Record<string, CaseType[]>>({});
  const [checkedSet, setCheckedSet] = useState<CheckedSet>({
    suites: new Set(),
    cases: new Set(),
  });
  const [selectedSuiteId, setSelectedSuiteId] = useState<string | null>(null);
  const [selectedSuiteName, setSelectedSuiteName] = useState<string>("");

  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) => {
      setTree(res.children);
    });
  }, []);

  const collectSuiteIds = useCallback(
    (node: GetAllSuitesByProjectIdSuitesType): string[] => {
      let ids = [node.suiteId];
      for (const child of node.children ?? []) {
        ids = ids.concat(collectSuiteIds(child));
      }
      return ids;
    },
    [],
  );

  const handleToggleSuite = useCallback(
    async (node: GetAllSuitesByProjectIdSuitesType, checked: boolean) => {
      const suiteIds = collectSuiteIds(node);

      const newCases: CaseType[] = [];
      for (const id of suiteIds) {
        if (!casesMap[id]) {
          const resp = await getOneLevelSuite({
            projectId: mockProjectId,
            suiteId: id,
            offset: 1,
            limit: 200,
          });
          setCasesMap((m) => ({ ...m, [id]: resp.cases ?? [] }));
          newCases.push(...(resp.cases ?? []));
        } else {
          newCases.push(...casesMap[id]);
        }
      }
      const caseIds = newCases.map((c) => c.caseId);

      setCheckedSet((prev) => {
        const next = {
          suites: new Set(prev.suites),
          cases: new Set(prev.cases),
        };
        if (checked) {
          suiteIds.forEach((id) => next.suites.add(id));
          caseIds.forEach((id) => next.cases.add(id));
        } else {
          suiteIds.forEach((id) => next.suites.delete(id));
          caseIds.forEach((id) => next.cases.delete(id));
        }
        return next;
      });
    },
    [casesMap, collectSuiteIds],
  );

  const toggleExpand = async (node: GetAllSuitesByProjectIdSuitesType) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev);
      if (next.has(node.suiteId)) next.delete(node.suiteId);
      else next.add(node.suiteId);
      return next;
    });
  };

  const handleSelectSuite = async (node: GetAllSuitesByProjectIdSuitesType) => {
    setSelectedSuiteId(node.suiteId);
    setSelectedSuiteName(node.suiteName);
    if (!casesMap[node.suiteId]) {
      const resp = await getOneLevelSuite({
        projectId: mockProjectId,
        suiteId: node.suiteId,
        offset: 1,
        limit: 200,
      });
      setCasesMap((m) => ({ ...m, [node.suiteId]: resp.cases ?? [] }));
    }
  };

  const renderNode = (node: GetAllSuitesByProjectIdSuitesType, depth = 0) => {
    const isExpanded = expandedSuites.has(node.suiteId);
    const isChecked = checkedSet.suites.has(node.suiteId);

    return (
      <div key={node.suiteId} style={{ marginLeft: 20 }} className="suite-node">
        <div className="suite-node--header">
          <button
            className="suite-node__arrow-btn"
            onClick={() => toggleExpand(node)}
          >
            {isExpanded ? <UpArrow /> : <DownArrow />}
          </button>
          <Checkbox
            isActiveMainCheckbox={isChecked}
            onChange={(checked) => handleToggleSuite(node, checked)}
          />
          <button
            className="suite-node__select-btn"
            onClick={() => handleSelectSuite(node)}
          >
            <FolderIcon color={"#333"} />
            <span className="suite__title">{node.suiteName}</span>
          </button>
        </div>

        {isExpanded ? (
          <div>
            {node.children?.map((child) => renderNode(child, depth + 1))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="select-cases">
      <h1 className="select-cases__title">Select test cases</h1>
      <Search
        placeholder="Search for test cases"
        className="select-cases__search"
      />
      <div className="select-cases__upper-line" />

      <div className="select-cases__all-checkbox">
        <Checkbox
          isActiveMainCheckbox={
            tree.length > 0 &&
            tree.every((n) => checkedSet.suites.has(n.suiteId))
          }
          onChange={(checked) => {
            tree.forEach((node) => handleToggleSuite(node, checked));
          }}
        />
        <div className="select-all_label">Select all</div>
      </div>

      <div className="select-cases__content">
        <div className="select-cases__left-side">
          {tree.map((root) => renderNode(root))}
        </div>
        <div className="select-cases__right-side">
          <div className="select-cases__cases">
            {selectedSuiteId ? (
              <>
                <div className="selected-suite-name">{selectedSuiteName}</div>

                {casesMap[selectedSuiteId]?.length > 0 ? (
                  <div className="select-cases__suite-checkbox">
                    <Checkbox
                      isActiveMainCheckbox={
                        (casesMap[selectedSuiteId] || []).length > 0 &&
                        (casesMap[selectedSuiteId] || []).every((c) =>
                          checkedSet.cases.has(c.caseId),
                        )
                      }
                      onChange={(checked) => {
                        setCheckedSet((prev) => {
                          const next = {
                            suites: new Set(prev.suites),
                            cases: new Set(prev.cases),
                          };
                          const suiteCases = casesMap[selectedSuiteId] || [];
                          suiteCases.forEach((c) => {
                            if (checked) next.cases.add(c.caseId);
                            else next.cases.delete(c.caseId);
                          });
                          return next;
                        });
                      }}
                    />
                    <div className="select-all_label-cases">Select all</div>
                  </div>
                ) : null}

                {casesMap[selectedSuiteId]?.length === 0 ? (
                  <div className="cases-block__empty">The suite is empty</div>
                ) : null}

                {(casesMap[selectedSuiteId] || []).map((c) => (
                  <div className="case-node" key={c.caseId}>
                    <Checkbox
                      isActiveMainCheckbox={checkedSet.cases.has(c.caseId)}
                      onChange={(checked) => {
                        setCheckedSet((prev) => {
                          const next = {
                            suites: new Set(prev.suites),
                            cases: new Set(prev.cases),
                          };
                          if (checked) next.cases.add(c.caseId);
                          else next.cases.delete(c.caseId);
                          return next;
                        });
                      }}
                    />
                    <HandIcon />
                    <span>{c.caseName}</span>
                  </div>
                ))}
              </>
            ) : null}
          </div>
          <div className="select-cases__buttons">
            <Button className="right-side__cancel" onClick={closeModal}>
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCasesModal;
