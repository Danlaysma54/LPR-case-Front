import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { mockProjectId } from "@/config/mockData";
import { getOneLevelSuite } from "@/entites/OneLevel/api/GetOneLevelData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { getTestPlanById } from "@/entites/TestPlan/api/TestPlanApi";
import Button from "@/shared/ui/button/Button";
import Search from "@/shared/ui/search/Search";
import { CaseType, TestPlanResponseType } from "@/types/UnitsType";
import { GetAllSuitesByProjectIdSuitesType } from "@/widgets/select-cases-modal/SelectCasesModal";
import SelectedSuitesList from "@/widgets/selected-suites-list/SelectedSuitesList";

import "./TestPlan.css";

const TestPlan = () => {
  const { planId } = useParams<{ planId: string }>();
  const [testPlan, setTestPlan] = useState<TestPlanResponseType | null>(null);
  const [selectedSuites, setSelectedSuites] = useState<string[]>([]);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [allSuitesTree, setAllSuitesTree] = useState<
    GetAllSuitesByProjectIdSuitesType[]
  >([]);
  const [casesMap, setCasesMap] = useState<Record<string, CaseType[]>>({});
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    if (planId) {
      getTestPlanById({ projectId: mockProjectId, testPlanId: planId }).then(
        (res) => {
          const plan = res.testPlan;
          setTestPlan(plan);
          const caseIds = plan.testCases.map((c) => c.caseId);
          setSelectedCases(caseIds);
          // Предполагается, что у каждого кейса есть свойство suiteId
          const suiteIds = Array.from(
            new Set(plan.testCases.map((c) => c.suiteId)),
          );
          setSelectedSuites(suiteIds);
        },
      );
    }
  }, [planId]);

  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((r) => {
      setAllSuitesTree(r.children);
    });
  }, []);

  useEffect(() => {
    selectedSuites.forEach((suiteId) => {
      if (!casesMap[suiteId]) {
        getOneLevelSuite({
          projectId: mockProjectId,
          suiteId,
          offset: 1,
          limit: 200,
        }).then((resp) => {
          setCasesMap((m) => ({ ...m, [suiteId]: resp.cases || [] }));
        });
      }
    });
  }, [casesMap, selectedSuites]);

  const onToggleSuite = (suiteId: string) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev);
      if (next.has(suiteId)) next.delete(suiteId);
      else next.add(suiteId);
      return next;
    });
  };

  const onRemoveCase = (caseId: string) => {
    setSelectedCases((prev) => prev.filter((id) => id !== caseId));
  };

  return (
    <div className="plan">
      <div className="plan__header">
        <button
          className="plan__back-button"
          onClick={() => navigate("/plans")}
        >
          <BackArrow />
        </button>
        <h1 className="plan__title">{testPlan?.testPlanName}</h1>
      </div>
      <div className="plan__info">
        <span className="plan__test-cases">Test cases</span>
        <div className="plan__upper-line" />
      </div>
      <div className="plan__main">
        <div className="plan__upper-buttons">
          <Search
            placeholder="Search for test cases"
            className="plan__search"
          />
          <Button className="plan__add-cases">
            <PlusIcon />
            Add test cases
          </Button>
        </div>
        <SelectedSuitesList
          selectedSuites={selectedSuites}
          selectedCases={selectedCases}
          allSuitesTree={allSuitesTree}
          casesMap={casesMap}
          expandedSuites={expandedSuites}
          onToggleSuite={onToggleSuite}
          onRemoveCase={onRemoveCase}
        />
      </div>
    </div>
  );
};

export default TestPlan;
