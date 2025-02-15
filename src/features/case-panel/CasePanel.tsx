import "./CasePanel.css";

import { useEffect, useRef, useState } from "react";

import HandIcon from "@/assets/svgs/HandIcon";
import MoreIcon from "@/assets/svgs/MoreIcon";
import { mockProjectId } from "@/config/mockData";
import { deleteCase } from "@/entites/Case/api/CaseApi";
import { getOneLevelSuite } from "@/entites/OneLevel/api/GetOneLevelData";
import { saveOpenedSuite } from "@/entites/OneLevel/model/OnelLevelActions";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import ActionMenu from "@/shared/ui/action-menu/ActionMenu";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";
import AddCaseModal from "@/widgets/modal-windows/AddCaseModal";

type CasePanelProps = {
  name: string;
  caseId: string;
};

const CasePanel = ({ name: name, caseId: caseId }: CasePanelProps) => {
  const [isEditCaseModalOpen, setEditCaseModalOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const dispatch = useAppDispatch();
  const offset = 1;
  const limit = 200;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleEdit = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setEditCaseModalOpen(true);
  };

  const handleDelete = () => {
    deleteCase(mockProjectId, caseId);
    if (openedSuite?.suiteContent.cases?.find((el) => el.caseId == caseId)) {
      getOneLevelSuite({
        projectId: mockProjectId,
        suiteId: openedSuite?.suiteId,
        offset: offset,
        limit: limit,
      }).then((response) => {
        dispatch(
          saveOpenedSuite({
            cases: response.cases,
            suites: response.suites,
            suiteId: openedSuite?.suiteId,
            suiteName: openedSuite?.suiteName,
          }),
        );
      });
    }
  };

  return (
    <div className="case-panel" ref={panelRef}>
      <AddCaseModal
        isModalOpen={isEditCaseModalOpen}
        isEditMode={true}
        caseId={caseId}
        setModalOpen={setEditCaseModalOpen}
        suites={allSuites.children}
      />
      <div className="case-panel__more-wrapper">
        <button
          className={`case-panel__more-icon ${isMenuOpen ? "case-panel__more-icon--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
        >
          <MoreIcon />
        </button>
        {isMenuOpen ? (
          <ActionMenu
            onEdit={handleEdit}
            onDelete={handleDelete}
            onClose={() => setMenuOpen(false)}
          />
        ) : null}
      </div>
      <input type="checkbox" className="case-panel__checkbox" />
      <div className="dash" />
      <HandIcon />
      <div className="case-panel__name">{name}</div>
    </div>
  );
};

export default CasePanel;
