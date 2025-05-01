// CreatePlan.tsx
import "./CreatePlan.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import DeleteIcon from "@/assets/svgs/DeleteIcon";
import DownArrow from "@/assets/svgs/DownArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import UpArrow from "@/assets/svgs/UpArrow";
import { mockProjectId } from "@/config/mockData";
import { getOneLevelSuite } from "@/entites/OneLevel/api/GetOneLevelData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import { CaseType } from "@/types/UnitsType";
import SelectCasesModal, {
  GetAllSuitesByProjectIdSuitesType,
} from "@/widgets/select-cases-modal/SelectCasesModal";

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
  }, [selectedSuites]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <div className="create-plan__selected-list">
            {selectedSuites.map((suiteId) => {
              const name = findSuiteName(allSuitesTree, suiteId) || suiteId;
              const suiteCases = casesMap[suiteId] || [];
              const shownCases = suiteCases.filter((c) =>
                selectedCases.includes(c.caseId),
              );
              const isExpanded = expandedSuites.has(suiteId);
              return (
                <div key={suiteId} className="selected-suite-block">
                  <button
                    type="button"
                    className="selected-suite__name-part"
                    onClick={() => {
                      setExpandedSuites((prev) => {
                        const next = new Set(prev);
                        if (next.has(suiteId)) next.delete(suiteId);
                        else next.add(suiteId);
                        return next;
                      });
                    }}
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
                            onClick={() => {
                              setSelectedCases((prev) =>
                                prev.filter((ca) => !(ca === c.caseId)),
                              );
                            }}
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
          </div>
        </div>

        <div className="create-plan__form-border" />

        <div className="create-plan__form-buttons">
          <Button type="button">Create plan</Button>
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
