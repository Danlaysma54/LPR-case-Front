import "./AddSuiteModal.css";

import React, { useState } from "react";

import { mockProjectId } from "@/config/mockData";
import { addSuite } from "@/entites/Suites/api/SuiteApi";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";

type AddSuiteModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suites: GetSuitesByProjectIdResponseType;
};

const AddSuiteModal = ({
  isModalOpen,
  setModalOpen,
  suites,
}: AddSuiteModalProps) => {
  const [parentSuite, setParentSuite] = useState<string | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const nameForm = UseFormField();
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
        suiteRootId: parentSuite || mockProjectId,
      },
    }).then((res) => {
      if (res.suiteId) {
        window.location.reload();
      }
    });
  };

  const handleParentSuiteSelect = (suiteId: string) => {
    setParentSuite(suiteId);
    setDropdownOpen(false);
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, suiteId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      handleParentSuiteSelect(suiteId);
    }
  };

  const findParentSuiteName = () => {
    const parentSuiteName = suites.suites.find(
      (suite) => suite.suiteId === parentSuite,
    )?.suiteName;
    if (parentSuiteName) {
      return parentSuiteName;
    } else {
      return "Project root";
    }
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
              onKeyDown={handleDropdownKeyDown}
              role="button"
              tabIndex={0}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="custom-select__selected">
                {parentSuite ? findParentSuiteName() : "Project root"}
              </div>
              {isDropdownOpen ? (
                <ul
                  tabIndex={0}
                  className="custom-select__dropdown"
                  role="listbox"
                  aria-activedescendant={parentSuite || undefined}
                >
                  <li
                    onClick={() => handleParentSuiteSelect(mockProjectId)}
                    onKeyDown={(e) => handleOptionKeyDown(e, "")}
                    className="custom-select__option"
                    role="option"
                    tabIndex={-1}
                    aria-selected={parentSuite === "" ? "true" : "false"}
                  >
                    Project root
                  </li>
                  {suites.suites.map((suite) => (
                    <li
                      key={suite.suiteId}
                      onClick={() => handleParentSuiteSelect(suite.suiteId)}
                      onKeyDown={(e) => handleOptionKeyDown(e, suite.suiteId)}
                      className="custom-select__option"
                      role="option"
                      tabIndex={-1}
                      aria-selected={
                        parentSuite === suite.suiteId ? "true" : "false"
                      }
                    >
                      {suite.suiteName}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="add-suite__buttons">
            <Button
              onClick={closeAddSuiteModal}
              style={{ backgroundColor: "var(--neutrals400)" }}
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
