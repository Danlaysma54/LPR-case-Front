import { useState } from "react";

import CloneIcon from "@/assets/svgs/CloneIcon";
import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
import PlusIcon from "@/assets/svgs/PlusIcon";
import RunIcon from "@/assets/svgs/RunIcon";
import { mockProjectId } from "@/config/mockData";
import {
  addSuite,
  editSuite,
  getAllSuitesByProjectId,
} from "@/entites/Suites/api/SuiteApi";
import { useAppSelector } from "@/shared/hooks/ReduxHooks";
import Button from "@/shared/ui/button/Button";
import { GetSuitesByProjectIdResponseType, SuiteType } from "@/types/UnitsType";
import SuiteModal from "@/widgets/modal-windows/suite-modal/SuiteModal";
import Search from "src/shared/ui/search/Search";
import "./RepositoryHeader.css";

type RepositoryHeaderProps = {
  repositoryName: string;
};

export type SelectedSuiteType = {
  suiteId: string;
  suiteName: string;
  suiteContent: {
    suiteName: string;
    suiteId: string;
    suites?: SuiteType[]; // Сделали опциональным
    cases?: { caseName: string; caseId: string }[]; // Сделали опциональным
  };
};

const RepositoryHeader = ({ repositoryName }: RepositoryHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<SelectedSuiteType | null>(
    null,
  );
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });

  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );

  const openAddSuiteModal = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setEditMode(false);
    setSelectedSuite(null);
    setModalOpen(true);
  };

  const openEditSuiteModal = () => {
    if (!openedSuite) return;

    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setEditMode(true);
    setSelectedSuite(openedSuite);
    setModalOpen(true);
  };

  return (
    <div className="repository-header">
      <SuiteModal
        actionName={editMode ? "Edit" : "Create"}
        onSubmitSuite={editMode ? editSuite : addSuite}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        suites={allSuites.children}
        selectedSuite={selectedSuite}
      />
      <div className="repository-header__info">
        <span className="repository-name__info--name">
          {repositoryName} repository
        </span>
      </div>
      <div className="repository-header__buttons">
        <Button
          className="repository-header__buttons--add"
          onClick={openAddSuiteModal}
        >
          <PlusIcon /> Suite
        </Button>
        <Button className="repository-header__buttons--add">
          <PlusIcon /> Case
        </Button>
        {openedSuite?.suiteId ? (
          <>
            <Button className="repository-header__button-additional">
              <RunIcon /> Run
            </Button>
            <Button
              onClick={openEditSuiteModal}
              className="repository-header__button-additional"
            >
              <EditIcon /> Edit
            </Button>
            <Button className="repository-header__button-additional">
              <CloneIcon /> Clone
            </Button>
            <Button className="repository-header__button-additional">
              <DeleteIcon /> Delete
            </Button>
          </>
        ) : null}
        <Search />
      </div>
    </div>
  );
};

export default RepositoryHeader;
