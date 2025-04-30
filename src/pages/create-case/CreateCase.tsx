import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { mockProjectId } from "@/config/mockData";
import { getAllAutomationStatusesMock } from "@/entites/AutomationStatus/api/AutomationStatusMockApi";
import { getAllLayersMock } from "@/entites/Layer/api/LayerMockApi";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import CaseStep from "@/features/case-step/CaseStep";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import DropdownSelect from "@/shared/ui/dropdown-select/DropdownSelect";
import Input from "@/shared/ui/input/Input";
import {
  AutomationStatusType,
  GetSuitesByProjectIdResponseType,
  LayerType,
} from "@/types/UnitsType";

import "./CreateCase.css";

export type caseStepType = {
  stepAction: string;
  data: string;
  stepResult: string;
};

const CreateCase = () => {
  const navigate = useNavigate();
  const titleField = UseFormField();
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const [selectedSuite, setSelectedSuite] =
    useState<GetSuitesByProjectIdResponseType | null>(null);
  const [automationStatuses, setAutomationStatuses] = useState<
    AutomationStatusType[]
  >([]);
  const [selectedStatus, setSelectedStatus] =
    useState<AutomationStatusType | null>(null);
  const [steps, setSteps] = useState<caseStepType[]>([]);
  const [layers, setLayers] = useState<LayerType[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<LayerType | null>(null);
  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) => {
      const transformedChildren = res.children.map((suite) => ({
        ...suite,
        name: suite.suiteName,
      }));
      const transformedRes = {
        ...res,
        name: res.suiteName,
        children: transformedChildren,
      };
      setAllSuites(transformedRes);
    });

    getAllAutomationStatusesMock().then((res) => {
      setAutomationStatuses(res.data);
    });

    getAllLayersMock().then((res) => {
      setLayers(res.data);
    });
  }, []);
  const selectSuite = (suite: GetSuitesByProjectIdResponseType) => {
    setSelectedSuite(suite);
  };

  const selectStatus = (status: AutomationStatusType) => {
    setSelectedStatus(status);
  };

  const selectLayer = (layer: LayerType) => {
    setSelectedLayer(layer);
  };
  const addStep = () => {
    setSteps([...steps, { stepAction: "", data: "", stepResult: "" }]);
  };
  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
  };
  const updateStep = (index: number, field: string, value: string) => {
    const newSteps = steps.map((step, i) =>
      i === index ? { ...step, [field]: value } : step,
    );
    setSteps(newSteps);
  };

  return (
    <div className="create-case">
      <div className="create-case__navigation">
        <button
          className="create-case_back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          <BackArrow />
        </button>
        <h1 className="create-case__title">Create test case</h1>
      </div>
      <div className="create-case__topic">Basic</div>
      <form className="create-case__form">
        <div className="create-case__form-content">
          <div className="create-case__form-title">
            <label className="create-case__label" htmlFor="title">
              Title
            </label>
            <Input
              className="create-case__form-input"
              onChange={titleField.onChange}
              placeholder="For example: Authorization"
            ></Input>
          </div>
          <div className="create-case__form-info">
            <div className="create-case__form-project">
              <label className="create-case__label" htmlFor="project-root">
                Test suite
              </label>
              <DropdownSelect
                items={allSuites.children}
                selectedItem={selectedSuite}
                onSelect={selectSuite}
                placeholder="Select suite"
                childrenKey="children"
                displayKey={"suiteName"}
                className="create-case__form-suite-select create-case__select"
              />
            </div>
            <div className="create-case__form-status">
              <label className="create-case__label" htmlFor="status">
                Automation status
              </label>
              <DropdownSelect
                items={automationStatuses}
                selectedItem={selectedStatus}
                onSelect={selectStatus}
                placeholder="Select status"
                className="create-case__form-status-select create-case__select"
              />
            </div>
            <div className="create-case__form-layer">
              <label className="create-case__label" htmlFor="layer">
                Layer
              </label>
              <DropdownSelect
                items={layers}
                selectedItem={selectedLayer}
                onSelect={selectLayer}
                placeholder="Select layer"
                displayKey="layerName"
                className="create-case__form-status-select create-case__select"
              />
            </div>
          </div>
          <div className="create-case__form-steps">
            <h3 className="create-case__form-steps-title">Test case steps</h3>
            {steps.map((step, index) => (
              <CaseStep
                key={index}
                index={index}
                step={step}
                onChange={updateStep}
                onRemove={removeStep}
                onCreate={addStep}
              />
            ))}
            <Button
              className="create-case__add-step"
              type="button"
              onClick={() => addStep()}
            >
              <PlusIcon />
              Add step
            </Button>
          </div>
        </div>
        <div className="create-case__form-border"></div>
        <div className="create-case__form-buttons">
          <Button type="button">Save</Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="create-case__cancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCase;
