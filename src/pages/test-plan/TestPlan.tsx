import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { mockProjectId } from "@/config/mockData";
import { getOneLevelSuite } from "@/entites/OneLevel/api/GetOneLevelData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import {
  editTestPlan,
  getTestPlanById,
} from "@/entites/TestPlan/api/TestPlanApi";
import Button from "@/shared/ui/button/Button";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import Search from "@/shared/ui/search/Search";
import { CaseType, TestPlanResponseType } from "@/types/UnitsType";
import SelectCasesModal, {
  GetAllSuitesByProjectIdSuitesType,
} from "@/widgets/select-cases-modal/SelectCasesModal";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (planId) {
      getTestPlanById({ projectId: mockProjectId, testPlanId: planId }).then(
        (res) => {
          const plan = res.testPlan;
          setTestPlan(plan);
          setNameDraft(plan.testPlanName);
          const caseIds = plan.testCases.map((c) => c.caseId);
          setSelectedCases(caseIds);
          const suiteIds = Array.from(
            new Set(plan.testCases.map((c) => c.suiteId)),
          );
          setSelectedSuites(suiteIds);
        },
      );
    }
  }, [planId]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
    }
  }, [isEditingName]);

  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((r) => {
      setAllSuitesTree(r.children);
    });
  }, []);

  const startEditName = () => {
    setIsEditingName(true);
  };

  const commitName = async () => {
    if (testPlan && nameDraft.trim()) {
      setTestPlan({ ...testPlan, testPlanName: nameDraft.trim() });
    }
  };

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
  const getSuiteIdForCase = (caseId: string): string | null => {
    for (const [suiteId, cases] of Object.entries(casesMap)) {
      if (cases.some((c) => c.caseId === caseId)) return suiteId;
    }
    return null;
  };

  const onSave = (suites: string[], cases: string[]) => {
    const newSuites = new Set(suites);
    cases.forEach((caseObj) => {
      const parentSuiteId = getSuiteIdForCase(caseObj);
      if (parentSuiteId) {
        newSuites.add(parentSuiteId);
      }
    });

    setSelectedSuites(Array.from(newSuites));
    setSelectedCases(cases);
    closeModal();
  };

  const onRemoveCase = (caseId: string) => {
    setSelectedCases((prev) => prev.filter((id) => id !== caseId));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onEdit = async () => {
    editTestPlan({
      projectId: mockProjectId,
      testPlanId: planId || "",
      testPlanName: testPlan?.testPlanName || "",
      testCases: selectedCases.map((id) => id),
    });
    navigate("/plans");
  };
  return (
    <div className="plan">
      <ModalWindow
        onClose={closeModal}
        isOpened={isModalOpen}
        className="select-cases__modal"
      >
        <SelectCasesModal
          initialCheckedSuites={selectedSuites}
          initialCheckedCases={selectedCases}
          closeModal={closeModal}
          onSave={onSave}
        />
      </ModalWindow>
      <div className="plan__header">
        <button
          className="plan__back-button"
          onClick={() => navigate("/plans")}
        >
          <BackArrow />
        </button>
        {isEditingName ? (
          <input
            ref={nameInputRef}
            className="plan__title-input"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                commitName();
                setIsEditingName(false);
              }
              if (e.key === "Escape") setIsEditingName(false);
            }}
          />
        ) : (
          <h1 className="plan__title" onDoubleClick={startEditName}>
            {testPlan?.testPlanName}
          </h1>
        )}
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
          <Button className="plan__add-cases" onClick={openModal}>
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
      <div className="plan__bottom-line" />
      <div className="plan__bottom-buttons">
        <Button className="create-plan__save" onClick={onEdit}>
          Edit
        </Button>
        <Button
          className="create-plan__cancel"
          onClick={() => {
            navigate("/plans");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default TestPlan;
