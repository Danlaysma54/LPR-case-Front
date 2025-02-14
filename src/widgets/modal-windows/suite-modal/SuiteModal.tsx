import React, { useState } from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import UpArrow from "@/assets/svgs/UpArrow";
import { mockProjectId } from "@/config/mockData";
import { saveOpenedSuite } from "@/entites/OneLevel/model/OnelLevelActions";
import { saveRenderedSuites } from "@/entites/Suites/model/SuitesActions";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import {
  AddSuiteResponseType,
  EditSuiteResponseType,
  GetSuitesByProjectIdResponseType,
  SuiteType,
} from "@/types/UnitsType";

import "./SuiteModal.css";
import { SelectedSuiteType } from "@/widgets/repository-header/RepositoryHeader";

type SuiteModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suites: GetSuitesByProjectIdResponseType[];
  actionName: string;
  onSubmitSuite: (params: {
    projectId: string;
    suite: { suiteName: string; suiteRootId: string; suiteId: string };
  }) => Promise<AddSuiteResponseType> | Promise<EditSuiteResponseType>;
  selectedSuite: SelectedSuiteType | null;
};

const SuiteModal = ({
  isModalOpen,
  setModalOpen,
  suites,
  onSubmitSuite,
  selectedSuite,
  actionName,
}: SuiteModalProps) => {
  const [parentSuite, setParentSuite] =
    useState<GetSuitesByProjectIdResponseType | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>(
    {},
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const nameForm = UseFormField();
  const dispatch = useAppDispatch();
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const renderedSuites = useAppSelector(
    (state) => state["RENDERED_SUITES_REDUCER"]?.renderedSuites,
  );

  const toggleExpand = (suiteId: string) => {
    setExpandedSuites((prev) => ({
      ...prev,
      [suiteId]: !prev[suiteId],
    }));
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

  const handleParentSuiteSelect = (suite: GetSuitesByProjectIdResponseType) => {
    setParentSuite(suite);
    setDropdownOpen(false);
  };

  const renderSuites = (
    suites: GetSuitesByProjectIdResponseType[],
    level = 0,
  ) => {
    return suites.map((suite) => (
      <li key={suite.suiteId} className="custom-select__item">
        <div
          className="custom-select__item"
          style={{ paddingLeft: `${level * 20}px` }}
        >
          {suite.children.length > 0 && (
            <button
              type="button"
              className="custom-select__button"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(suite.suiteId);
              }}
              aria-label={expandedSuites[suite.suiteId] ? "Collapse" : "Expand"}
            >
              {expandedSuites[suite.suiteId] ? <UpArrow /> : <DownArrow />}
            </button>
          )}
          <button
            className={`custom-select__option ${
              parentSuite?.suiteId === suite.suiteId ? "selected" : ""
            }`}
            onClick={() => handleParentSuiteSelect(suite)}
          >
            {suite.suiteName}
          </button>
        </div>
        {expandedSuites[suite.suiteId] && suite.children.length > 0 ? (
          <ul className="custom-select__nested">
            {renderSuites(suite.children, level + 1)}
          </ul>
        ) : null}
      </li>
    ));
  };

  const closeAddSuiteModal = () => setModalOpen(false);

  function removeSuiteFromList(
    suites: SuiteType[],
    suiteToRemove: SuiteType,
  ): boolean {
    for (let i = 0; i < suites.length; i++) {
      if (suites[i].suiteId === suiteToRemove.suiteId) {
        suites.splice(i, 1);
        return true;
      }
      const childData = suites[i].children;
      if (childData && childData.suites.length > 0) {
        const removed = removeSuiteFromList(childData.suites, suiteToRemove);
        if (removed) {
          return true;
        }
      }
    }
    return false;
  }

  function rerenderSuites(newSuite: {
    suiteId: string | undefined;
    suiteName: string;
    suiteRootId: string;
  }) {
    const newOpenedSuite = {
      ...openedSuite?.suiteContent,
      suiteName: newSuite.suiteName,
    };
    dispatch(saveOpenedSuite(newOpenedSuite));
    if (!newSuite.suiteId) return;
    const foundSuite = findSuiteById(renderedSuites, newSuite.suiteId);
    if (foundSuite) {
      if (foundSuite.suiteRootId !== newSuite.suiteRootId) {
        removeSuiteFromList(renderedSuites, foundSuite);
        foundSuite.suiteRootId = newSuite.suiteRootId;
        if (newSuite.suiteRootId === mockProjectId) {
          renderedSuites.push(foundSuite);
        } else {
          const newParent = findSuiteById(renderedSuites, newSuite.suiteRootId);
          if (newParent) {
            if (!newParent.children) {
              newParent.hasChildSuites = true;
              newParent.children = {
                suites: [],
                cases: [],
              };
            }
            newParent.children.suites.push(foundSuite);
          }
        }
      }
      foundSuite.suiteName = newSuite.suiteName;
    } else {
      const newSuiteObj: SuiteType = {
        suiteId: newSuite.suiteId,
        suiteName: newSuite.suiteName,
        suiteRootId: newSuite.suiteRootId,
        numberOfChild: 0,
        children: {
          suites: [],
          cases: [],
        },
      };
      if (newSuite.suiteRootId === mockProjectId) {
        renderedSuites.push(newSuiteObj);
      } else {
        const newParent = findSuiteById(renderedSuites, newSuite.suiteRootId);
        if (newParent) {
          if (!newParent.children) {
            newParent.children = {
              suites: [],
              cases: [],
            };
          }
          newParent.hasChildSuites = true;
          newParent.children?.suites.push(newSuiteObj);
        }
      }
    }

    dispatch(saveRenderedSuites([...renderedSuites]));
  }

  const handleAddSuite = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameForm.value.length < 2 || nameForm.value.length > 255) {
      setErrorMessage("Suite name should be 2-255 characters long");
      return;
    }
    const newSuite = {
      suiteId: selectedSuite ? selectedSuite.suiteId : "",
      suiteName: nameForm.value,
      suiteRootId: parentSuite?.suiteId || mockProjectId,
    };
    onSubmitSuite({
      projectId: mockProjectId,
      suite: newSuite,
    }).then((res) => {
      if (res && "suiteId" in res) {
        if (res.suiteId) {
          newSuite.suiteId = res.suiteId;
        }
        rerenderSuites(newSuite);
        closeAddSuiteModal();
      }
    });
  };

  return (
    <ModalWindow isOpened={isModalOpen} onClose={closeAddSuiteModal}>
      <div className="add-suite">
        <h2 className="add-suite__title">{actionName} Suite</h2>
        <form className="add-suite__form" onSubmit={handleAddSuite}>
          <div className="add-suite__wrapper">
            <label htmlFor="name" className="add-suite__label">
              Suite Name
            </label>
            <Input
              {...nameForm}
              id="name"
              name="name"
              required={true}
              className="add-suite__input"
              type="text"
              placeholder="For example: Web application"
            />
            <div className="add-suite__error-message">{errorMessage}</div>
          </div>

          <div className="add-suite__wrapper">
            <label htmlFor="parent-suite" className="add-suite__label">
              Parent Suite
            </label>
            <div
              className="custom-select"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setDropdownOpen(!isDropdownOpen);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="custom-select__selected">
                {parentSuite?.suiteName || "Project root"}
              </div>
              {isDropdownOpen ? (
                <ul className="custom-select__dropdown">
                  <li className="custom-select__item">
                    <button
                      className="custom-select__option"
                      onClick={() =>
                        handleParentSuiteSelect({
                          suiteId: mockProjectId,
                          suiteName: "Project root",
                          children: [],
                        })
                      }
                    >
                      Project root
                    </button>
                  </li>
                  {renderSuites(suites)}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="add-suite__buttons">
            <Button
              onClick={closeAddSuiteModal}
              className="add-suite__cancel--button"
            >
              Cancel
            </Button>
            <Button type="submit">{actionName}</Button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default SuiteModal;
