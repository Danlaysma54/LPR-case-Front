import React, { useState } from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import UpArrow from "@/assets/svgs/UpArrow";
import { mockProjectId } from "@/config/mockData";
import { addSuite } from "@/entites/Suites/api/SuiteApi";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";

import "./AddSuiteModal.css";

type AddSuiteModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suites: GetSuitesByProjectIdResponseType[];
};

const AddSuiteModal = ({
  isModalOpen,
  setModalOpen,
  suites,
}: AddSuiteModalProps) => {
  const [parentSuite, setParentSuite] =
    useState<GetSuitesByProjectIdResponseType | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>(
    {},
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const nameForm = UseFormField();

  const toggleExpand = (suiteId: string) => {
    setExpandedSuites((prev) => ({
      ...prev,
      [suiteId]: !prev[suiteId],
    }));
  };
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

  const handleAddSuite = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameForm.value.length < 2 || nameForm.value.length > 255) {
      setErrorMessage("Suite name should be 2-255 characters long");
      return;
    }
    addSuite({
      projectId: mockProjectId,
      suite: {
        suiteName: nameForm.value,
        suiteRootId: parentSuite?.suiteId || mockProjectId,
      },
    }).then((res) => {
      if (res.suiteId) {
        window.location.reload();
      }
    });
  };

  return (
    <ModalWindow isOpened={isModalOpen} onClose={closeAddSuiteModal}>
      <div className="add-suite">
        <h2 className="add-suite__title">Create Suite</h2>
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
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default AddSuiteModal;
