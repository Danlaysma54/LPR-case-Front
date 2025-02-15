import { useState } from "react";

import CloneIcon from "@/assets/svgs/CloneIcon";
import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
import PlusIcon from "@/assets/svgs/PlusIcon";
import RunIcon from "@/assets/svgs/RunIcon";
import { mockProjectId } from "@/config/mockData";
import { savePendingDeletion } from "@/entites/PendingDeletion/model/PendingDeletionActions";
import {
  addSuite,
  editSuite,
  getAllSuitesByProjectId,
  removeSuite,
} from "@/entites/Suites/api/SuiteApi";
import { saveRenderedSuites } from "@/entites/Suites/model/SuitesActions";
import PendingDeletion from "@/interfaces/PendingDeletion";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import Button from "@/shared/ui/button/Button";
import RemovedElement from "@/shared/ui/removedElement/RemovedElement";
import { GetSuitesByProjectIdResponseType, SuiteType } from "@/types/UnitsType";
import AddCaseModal from "@/widgets/modal-windows/AddCaseModal";
import RemoveModal from "@/widgets/modal-windows/remove-modal/RemoveModal";
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
    suites?: SuiteType[];
    cases?: { caseName: string; caseId: string }[];
  };
};

const RepositoryHeader = ({ repositoryName }: RepositoryHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSuite, setSelectedSuite] = useState<SelectedSuiteType | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const [isCaseModalOpen, setCaseModalOpen] = useState(false);
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const pendingElements = useAppSelector(
    (state) => state["PENDING_DELETION_REDUCER"]?.pendingDeletions,
  );
  const renderedSuites = useAppSelector(
    (state) => state["RENDERED_SUITES_REDUCER"]?.renderedSuites,
  );
  const openAddSuiteModal = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setEditMode(false);
    setSelectedSuite(null);
    setModalOpen(true);
  };

  const openAddCaseModal = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setCaseModalOpen(true);
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

  const openRemoveSuiteModal = () => {
    setRemoveModalOpen(true);
  };

  function findSuiteById(
    suites: SuiteType[],
    suiteId: string,
  ): SuiteType | undefined {
    for (const suite of suites) {
      if (suite.suiteId === suiteId) {
        return suite;
      }
      if (suite.children?.suites) {
        const found = findSuiteById(suite.children.suites, suiteId);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }

  function finalizeDeletion(id: string) {
    removeSuite({ projectId: mockProjectId, suiteId: id });
    const element = pendingElements?.find(
      (p: PendingDeletion<SuiteType>) => p.id === id,
    );
    if (element) {
      clearTimeout(element.timerId);
    }

    dispatch(
      savePendingDeletion(
        pendingElements.filter((p: PendingDeletion<SuiteType>) => p.id !== id),
      ),
    );
  }

  function restoreElementToUI(data: SuiteType) {
    if (data.suiteRootId === mockProjectId) {
      renderedSuites.push(data);
    } else {
      const newParent = findSuiteById(renderedSuites, data.suiteRootId);
      if (newParent) {
        if (!newParent.children) {
          newParent.children = {
            suites: [],
            cases: [],
          };
        }
        newParent.hasChildSuites = true;
        newParent.children?.suites.push(data);
      }
    }
    dispatch(saveRenderedSuites([...renderedSuites]));
  }

  const handleUndoDeletion = (pending: PendingDeletion<SuiteType>) => {
    clearTimeout(pending.timerId);

    dispatch(
      savePendingDeletion(
        pendingElements.filter(
          (p: PendingDeletion<SuiteType>) => p.id !== pending.id,
        ),
      ),
    );
    restoreElementToUI(pending.data);
  };
  return (
    <div className="repository-header">
      <AddCaseModal
        isModalOpen={isCaseModalOpen}
        setModalOpen={setCaseModalOpen}
        suites={allSuites.children}
      />
      <SuiteModal
        actionName={editMode ? "Edit" : "Create"}
        suites={allSuites.children}
        selectedSuite={selectedSuite}
        onSubmitSuite={editMode ? editSuite : addSuite}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      {pendingElements?.map((el, index) => {
        return (
          <RemovedElement
            style={{ top: `${60 + index * 80}px` }}
            key={el.id}
            onConfirm={finalizeDeletion}
            onUndo={handleUndoDeletion}
            pending={el}
          />
        );
      })}
      <SuiteModal
        actionName={editMode ? "Edit" : "Create"}
        onSubmitSuite={editMode ? editSuite : addSuite}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        suites={allSuites.children}
        selectedSuite={selectedSuite}
      />
      <RemoveModal
        isModalOpen={isRemoveModalOpen}
        setModalOpen={setRemoveModalOpen}
        objectName={"Suite"}
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
        <Button
          className="repository-header__buttons--add"
          onClick={openAddCaseModal}
        >
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
            <Button
              onClick={openRemoveSuiteModal}
              className="repository-header__button-additional"
            >
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
