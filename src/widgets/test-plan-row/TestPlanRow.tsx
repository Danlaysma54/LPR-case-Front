import { useNavigate } from "react-router";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import DropdownMenu, { MenuItem } from "@/shared/ui/dropdown-menu/DropdownMenu";
import { TestPlanResponseType } from "@/types/UnitsType";

type TestPlanRowProps = {
  testPlan: TestPlanResponseType;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  isActiveCheckbox: boolean;
};

const TestPlanRow = ({
  testPlan,
  onEdit,
  onRemove,
  isActiveCheckbox,
}: TestPlanRowProps) => {
  const navigate = useNavigate();
  const menuItems: MenuItem[] = [
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <EditIcon color="black" />
          Edit
        </div>
      ),
      onClick: () => onEdit(testPlan.testPlanId),
    },
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <DeleteIcon color="#C03744" />
          Delete
        </div>
      ),
      onClick: () => onRemove(testPlan.testPlanId),
    },
  ];
  return (
    <div className="test-plan__row">
      <div className="test-plan__cell">
        <Checkbox isActiveMainCheckbox={isActiveCheckbox} />
        <button
          className="test-plan__cell-button"
          onClick={() => navigate(`/plans/${testPlan.testPlanId}`)}
        >
          <div className="test-plan__cell">{testPlan.testPlanName}</div>
        </button>
      </div>
      {/*<div className="test-plan__cell">{testPlan.createdAt}</div>*/}
      {/*<div className="test-plan__cell">{testPlan.updatedAt}</div>*/}
      <div className="test-plan__cell">Хз, недавно</div>
      <div className="test-plan__cell">Тоже</div>
      <div className="test-plan__cell">
        {testPlan.testCases ? testPlan.testCases.length : 0} test cases
      </div>
      <div className="test-plan__cell test-plan__dropdown">
        <DropdownMenu
          items={menuItems}
          toggleClassName="test-plan__dropdown-toggle"
        />
      </div>
    </div>
  );
};

export default TestPlanRow;
