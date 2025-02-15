import React from "react";

import { mockProjectId } from "@/config/mockData";
import { saveOpenedSuite } from "@/entites/OneLevel/model/OnelLevelActions";
import { savePendingDeletion } from "@/entites/PendingDeletion/model/PendingDeletionActions";
import { removeSuite } from "@/entites/Suites/api/SuiteApi";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import Button from "@/shared/ui/button/Button";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import { SuiteType } from "@/types/UnitsType";

type RemoveModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  objectName: string;
};

const RemoveModal = (removeModalProps: RemoveModalProps) => {
  const timeout = 8000;
  const dispatch = useAppDispatch();
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const renderedSuites = useAppSelector(
    (state) => state["RENDERED_SUITES_REDUCER"]?.renderedSuites,
  );
  const pendingElements = useAppSelector(
    (state) => state["PENDING_DELETION_REDUCER"]?.pendingDeletions,
  );
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

  function removeSuiteFromList(suites: SuiteType[], suiteId: string): boolean {
    for (let i = 0; i < suites.length; i++) {
      if (suites[i].suiteId === suiteId) {
        suites.splice(i, 1);
        return true;
      }
      const childData = suites[i].children;
      if (childData && childData.suites.length > 0) {
        const removed = removeSuiteFromList(childData.suites, suiteId);
        if (removed) {
          return true;
        }
      }
    }
    return false;
  }
  function removePendingElementByTimerId(timerId: number) {
    dispatch(
      savePendingDeletion(pendingElements.filter((p) => p.timerId !== timerId)),
    );
  }
  const remove = () => {
    const suite = findSuiteById(renderedSuites, openedSuite?.suiteId);
    removeSuiteFromList(renderedSuites, openedSuite?.suiteId);
    if (suite) {
      const timerId = window.setTimeout(() => {
        removePendingElementByTimerId(timerId);
        removeSuite({
          projectId: mockProjectId,
          suiteId: openedSuite?.suiteId,
        });
      }, timeout);
      dispatch(
        saveOpenedSuite({ suiteId: "", suiteName: "", suites: [], cases: [] }),
      );
      dispatch(
        savePendingDeletion([
          ...pendingElements,
          {
            id: openedSuite.suiteId,
            data: suite,
            timerId,
          },
        ]),
      );
    }
    closeRemoveModal();
  };

  const closeRemoveModal = () => removeModalProps.setModalOpen(false);
  return (
    <ModalWindow
      isOpened={removeModalProps.isModalOpen}
      onClose={closeRemoveModal}
    >
      <p>Are you sure you want to delete this {removeModalProps.objectName}?</p>
      <div className="add-suite__buttons">
        <Button
          onClick={closeRemoveModal}
          className="add-suite__cancel--button"
        >
          Cancel
        </Button>
        <Button onClick={remove}>Remove</Button>
      </div>
    </ModalWindow>
  );
};

export default RemoveModal;
