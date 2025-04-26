import { useEffect, useState } from "react";

import PlusIcon from "@/assets/svgs/PlusIcon";
import { getTestPlansMock } from "@/entites/TestPlan/api/TestPlanMock";
import Button from "@/shared/ui/button/Button";
import Search from "@/shared/ui/search/Search";

import { TestPlanType } from "@/types/UnitsType";

import "./TestPlan.css";
import TestPlanRow from "@/widgets/test-plan-row/TestPlanRow";

const TestPlan = () => {
  const [testPlans, setTestPlans] = useState<TestPlanType[]>([]);
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  useEffect(() => {
    getTestPlansMock().then((res) => setTestPlans(res));
  }, []);

  const onEdit = (id: string) => {
    console.log("Edit", id);
    //TODO:: Edit test plan
  };
  const onRemove = (id: string) => {
    console.log("Remove", id);
    //TODO:: Remove test plan
  };
  return (
    <div className="test-plan">
      <div className="test-plan__header">
        <h1 className="test-plan__title">Test plans</h1>
        <div className="test-plan__interact">
          <Button>
            <PlusIcon /> Create plan
          </Button>
          <Search placeholder="Search for test plans" />
        </div>
      </div>
      <div className="test-plan__main">
        <div className="test-plan__row test-plan__row--header">
          <div className="test-plan__cell">
            <input
              type="checkbox"
              onClick={() => setIsActiveCheckbox(!isActiveCheckbox)}
              className="test-plan__checkbox"
            />
            <p className="test-plan__select-all">Select all </p>
          </div>
          <div className="test-plan__cell">Created</div>
          <div className="test-plan__cell">Updated</div>
          <div className="test-plan__cell">Cases</div>
          <div className="test-plan__cell"></div>
        </div>
        {testPlans?.map((testPlan) => (
          <TestPlanRow
            isActiveCheckbox={isActiveCheckbox}
            key={testPlan.planId}
            testPlan={testPlan}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default TestPlan;
