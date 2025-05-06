import "./CreatePlan.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { mockProjectId } from "@/config/mockData";
import { getOneLevelSuite } from "@/entites/OneLevel/api/GetOneLevelData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import addTestPlan from "@/entites/TestPlan/api/TestPlanApi";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import { CaseType } from "@/types/UnitsType";
import SelectCasesModal, {
  GetAllSuitesByProjectIdSuitesType,
} from "@/widgets/select-cases-modal/SelectCasesModal";
import SelectedSuitesList from "@/widgets/selected-suites-list/SelectedSuitesList";

const CreatePlan = () => {
  const navigate = useNavigate();
  const titleField = UseFormField();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuites, setSelectedSuites] = useState<string[]>([]);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [allSuitesTree, setAllSuitesTree] = useState<
    GetAllSuitesByProjectIdSuitesType[]
  >([]);
  const [casesMap, setCasesMap] = useState<Record<string, CaseType[]>>({});
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set());
  const [nameError, setNameError] = useState<boolean>(false);
  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((r) =>
      setAllSuitesTree(r.children),
    );
  }, []);

  useEffect(() => {
    selectedSuites.forEach((suiteId) => {
      if (!casesMap[suiteId]) {
        getOneLevelSuite({
          projectId: mockProjectId,
          suiteId,
          offset: 1,
          limit: 200,
        }).then((resp) =>
          setCasesMap((m) => ({ ...m, [suiteId]: resp.cases || [] })),
        );
      }
    });
  }, [casesMap, selectedSuites]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setNameError(false);
  }, [titleField.value]);

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

  const createPlan = async () => {
    if (titleField.value.length < 3) {
      setNameError(true);
      return;
    }
    const res = await addTestPlan({
      projectId: mockProjectId,
      testPlanName: titleField.value,
      testCases: selectedCases,
    });
    if (res.addedEntityId) {
      navigate(`/plans`);
    }
  };

  return (
    <div className="create-plan">
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

      <div className="create-plan__navigation">
        <button
          className="create-plan_back-button"
          onClick={() => navigate("/")}
        >
          <BackArrow />
        </button>
        <h1 className="create-plan__title">Create test plan</h1>
      </div>

      <form className="create-plan__form">
        <div className="create-plan__form-content">
          <div className="create-plan__form-title">
            <label className="create-plan__label" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              className="create-plan__form-input"
              onChange={titleField.onChange}
              placeholder="For example: Authorization"
            />
            {nameError ? (
              <div className="create-plan__name-error">
                The name must be at least 3 characters long.
              </div>
            ) : null}
          </div>
          <div className="create-plan__form-info">
            <Button
              className="create-plan__add-step"
              type="button"
              onClick={openModal}
            >
              <PlusIcon /> Add test cases
            </Button>
          </div>
          <SelectedSuitesList
            selectedSuites={selectedSuites}
            selectedCases={selectedCases}
            allSuitesTree={allSuitesTree}
            casesMap={casesMap}
            expandedSuites={expandedSuites}
            onToggleSuite={(suiteId) => {
              setExpandedSuites((prev) => {
                const next = new Set(prev);
                if (next.has(suiteId)) next.delete(suiteId);
                else next.add(suiteId);
                return next;
              });
            }}
            onRemoveCase={(caseId) => {
              setSelectedCases((prev) => prev.filter((ca) => ca !== caseId));
            }}
          />
        </div>

        <div className="create-plan__form-border" />

        <div className="create-plan__form-buttons">
          <Button onClick={createPlan} type="button">
            Create plan
          </Button>
          <Button
            type="button"
            className="create-plan__cancel"
            onClick={() => navigate("/plans")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlan;
