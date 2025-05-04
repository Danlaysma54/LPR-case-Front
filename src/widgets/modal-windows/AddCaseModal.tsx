import React, { useState } from "react";

import DownArrow from "@/assets/svgs/DownArrow";
import UpArrow from "@/assets/svgs/UpArrow";
import { mockProjectId } from "@/config/mockData";
import { addCase, editCase } from "@/entites/Case/api/CaseApi";
import { saveOpenedSuite } from "@/entites/OneLevel/model/OnelLevelActions";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/ReduxHooks";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import {
  AutomationStatusType,
  GetSuitesByProjectIdResponseType,
  LayerType,
} from "@/types/UnitsType";

type AddCaseModalProps = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  suites: GetSuitesByProjectIdResponseType[];
  isEditMode?: boolean;
  caseId?: string;
};

const layersMock: LayerType[] = [
  //TODO Хотелось бы запросики на эти штуки
  {
    layerId: "afce2a2c-4651-4436-8305-7f1d2d42e22d",
    layerName: "E2E",
  },
  {
    layerId: "a5746704-a423-4139-b57b-49676c91c4c3",
    layerName: "API",
  },
  {
    layerId: "4847ad45-99ba-4e50-93ed-141206d7fc4d",
    layerName: "UNIT",
  },
];

const automationStatusMock: AutomationStatusType[] = [
  {
    automationStatusId: "c47fa783-f165-4b33-b934-780e59261b2f",
    name: "Manual",
  },
  {
    automationStatusId: "90518baa-ca2d-4272-8dba-41703443791f",
    name: "Automated",
  },
];

const AddCaseModal = ({
  isModalOpen,
  setModalOpen,
  suites,
  isEditMode,
  caseId,
}: AddCaseModalProps) => {
  const [parentSuite, setParentSuite] =
    useState<GetSuitesByProjectIdResponseType | null>(null);
  const [isSuiteDropdownOpen, setSuiteDropdownOpen] = useState(false);
  const [expandedSuites, setExpandedSuites] = useState<Record<string, boolean>>(
    {},
  );
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const nameForm = UseFormField();

  const [selectedLayer, setSelectedLayer] = useState<LayerType>(layersMock[0]);
  const [isLayerDropdownOpen, setLayerDropdownOpen] = useState(false);

  const [selectedAutomationStatus, setSelectedAutomationStatus] =
    useState<AutomationStatusType>(automationStatusMock[0]);
  const [isAutomationDropdownOpen, setAutomationDropdownOpen] = useState(false);

  const toggleExpand = (suiteId: string) => {
    setExpandedSuites((prev) => ({
      ...prev,
      [suiteId]: !prev[suiteId],
    }));
  };

  const handleParentSuiteSelect = (suite: GetSuitesByProjectIdResponseType) => {
    setParentSuite(suite);
    setSuiteDropdownOpen(false);
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
            type="button"
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

  function editCaseReq() {
    editCase({
      projectId: mockProjectId,
      case: {
        testCaseId: caseId || "",
        suiteId: parentSuite?.suiteId || mockProjectId,
        testCaseName: nameForm.value,
        layer: selectedLayer.layerId,
        isAutomated: selectedAutomationStatus.automationStatusId,
      },
    }).then((res) => {
      if (res && openedSuite?.suiteId == parentSuite?.suiteId) {
        const currentCase = openedSuite?.suiteContent?.cases?.find(
          (el) => el.caseId === caseId,
        );
        if (currentCase) {
          currentCase.caseName = nameForm.value;
          currentCase.layerId = selectedLayer.layerId;
          currentCase.automationStatusId =
            selectedAutomationStatus.automationStatusId;
        }
        dispatch(saveOpenedSuite(openedSuite?.suiteContent));
      }
      closeAddCaseModal();
    });
  }

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameForm.value.length < 2 || nameForm.value.length > 255) {
      setErrorMessage("Case name should be 2-255 characters long");
      return;
    }
    if (!parentSuite?.suiteId) {
      setErrorMessage("Choose parent suite");
      return;
    }
    isEditMode
      ? editCaseReq()
      : addCase({
          projectId: mockProjectId,
          case: {
            suiteId: parentSuite?.suiteId || mockProjectId,
            testCaseName: nameForm.value,
            layerId: selectedLayer.layerId,
            isAutomatedId: selectedAutomationStatus.automationStatusId,
          },
        }).then((res) => {
          if (res && openedSuite?.suiteId == parentSuite?.suiteId) {
            // ДАНЯ НУ ПОЖАЛУЙСТА ОТПРАВЛЯЙ ОБЪЕКТ В RESPONSE сори за мат TODO
            openedSuite?.suiteContent?.cases?.push({
              caseName: nameForm.value,
              caseId: res.addedEntityId,
              layerId: selectedLayer.layerId,
              automationStatusId: selectedAutomationStatus.automationStatusId,
            });
            dispatch(saveOpenedSuite(openedSuite?.suiteContent));
          }
          closeAddCaseModal();
        });
  };

  const closeAddCaseModal = () => setModalOpen(false);

  return (
    <ModalWindow isOpened={isModalOpen} onClose={closeAddCaseModal}>
      <div className="add-suite">
        <h2 className="add-suite__title">
          {isEditMode ? "Edit" : "Create"} Case
        </h2>
        <form className="add-suite__form" onSubmit={handleAddCase}>
          <div className="add-suite__wrapper">
            <label htmlFor="name" className="add-suite__label">
              Case Name
            </label>
            <Input
              {...nameForm}
              id="name"
              name="name"
              required
              className="add-suite__input"
              type="text"
              placeholder="For example: ASIAN KUNG-FU GENERATION"
            />
            <div className="add-suite__error-message">{errorMessage}</div>
          </div>

          <div className="add-suite__wrapper">
            <label htmlFor="parent-suite" className="add-suite__label">
              Parent Suite
            </label>
            <div
              className="custom-select"
              onClick={() => setSuiteDropdownOpen(!isSuiteDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSuiteDropdownOpen(!isSuiteDropdownOpen);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isSuiteDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="custom-select__selected">
                {parentSuite?.suiteName || "Select parent suite"}
              </div>
              {isSuiteDropdownOpen ? (
                <ul className="custom-select__dropdown">
                  {renderSuites(suites)}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="add-suite__wrapper">
            <label htmlFor="layer" className="add-suite__label">
              Layer
            </label>
            <div
              className="custom-select"
              onClick={() => setLayerDropdownOpen(!isLayerDropdownOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setLayerDropdownOpen(!isLayerDropdownOpen);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isLayerDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="custom-select__selected">
                {selectedLayer.layerName}
              </div>
              {isLayerDropdownOpen ? (
                <ul className="custom-select__dropdown">
                  {layersMock.map((layer) => (
                    <li key={layer.layerId} className="custom-select__item">
                      <button
                        type="button"
                        className="custom-select__option"
                        onClick={() => {
                          setSelectedLayer(layer);
                          setLayerDropdownOpen(false);
                        }}
                      >
                        {layer.layerName}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="add-suite__wrapper">
            <label htmlFor="automation-status" className="add-suite__label">
              Automation Status
            </label>
            <div
              className="custom-select"
              onClick={() =>
                setAutomationDropdownOpen(!isAutomationDropdownOpen)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setAutomationDropdownOpen(!isAutomationDropdownOpen);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isAutomationDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="custom-select__selected">
                {selectedAutomationStatus.name}
              </div>
              {isAutomationDropdownOpen ? (
                <ul className="custom-select__dropdown">
                  {automationStatusMock.map((status) => (
                    <li
                      key={status.automationStatusId}
                      className="custom-select__item"
                    >
                      <button
                        type="button"
                        className="custom-select__option"
                        onClick={() => {
                          setSelectedAutomationStatus(status);
                          setAutomationDropdownOpen(false);
                        }}
                      >
                        {status.name}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          <div className="add-suite__buttons">
            <Button
              onClick={closeAddCaseModal}
              style={{ backgroundColor: "var(--neutrals400)" }}
            >
              Cancel
            </Button>
            <Button type="submit">{isEditMode ? "Edit" : "Create"}</Button>
          </div>
        </form>
      </div>
    </ModalWindow>
  );
};

export default AddCaseModal;
