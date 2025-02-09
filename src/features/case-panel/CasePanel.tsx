import "./CasePanel.css";

import React, { useEffect, useRef, useState } from "react";
import HandIcon from "src/assets/svgs/HandIcon";

import MoreIcon from "@/assets/svgs/MoreIcon";
import { mockProjectId } from "@/config/mockData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import ActionMenu from "@/shared/ui/action-menu/ActionMenu";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";
import AddCaseModal from "@/widgets/modal-windows/AddCaseModal";

type CasePanelProps = {
  name: string;
  caseId: string;
};

const CasePanel: React.FC<CasePanelProps> = ({ name, caseId }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isEditCaseModalOpen, setEditCaseModalOpen] = useState(false);
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const handleEdit = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setEditCaseModalOpen(true);
  };

  const handleDelete = () => {
    console.log("Удалить");
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
