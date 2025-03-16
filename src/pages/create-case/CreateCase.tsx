import "./CreateCase.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import { mockProjectId } from "@/config/mockData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import DropdownSelect from "@/shared/ui/dropdown-select/DropdownSelect";
import Input from "@/shared/ui/input/Input";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";

const CreateCase = () => {
  const navigate = useNavigate();
  const titleField = UseFormField();
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const [selectedSuite, setSelectedSuite] =
    useState<GetSuitesByProjectIdResponseType>();
  useEffect(() => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) => {
      const transformedChildren = res.children.map((suite) => ({
        ...suite,
        name: suite.suiteName,
      }));
      const transformedRes = {
        ...res,
        children: transformedChildren,
      };
      setAllSuites(transformedRes);
    });
  }, []);
  const selectSuite = (suite: GetSuitesByProjectIdResponseType) => {
    setSelectedSuite(suite);
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
            />
          </div>
          <div className="create-case__form-status">
            <label className="create-case__label" htmlFor="status">
              automation status
            </label>
            {/*TODO:: Add automation status selector */}
          </div>
          <div className="create-case__form-layer">
            <label className="create-case__label" htmlFor="layer">
              layer
            </label>
            {/*TODO:: Add layer selector */}
          </div>
        </div>
        <div className="create-case__form-steps">
          <h3>test case steps</h3>
          <Button>Add step</Button>
        </div>
        <div className="create-case__form-border"></div>
        <div className="create-case__form-buttons">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCase;
