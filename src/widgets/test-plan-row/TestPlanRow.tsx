import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import DropdownMenu, { MenuItem } from "@/shared/ui/dropdown-menu/DropdownMenu";
import { TestPlanType } from "@/types/UnitsType";

type TestPlanRowProps = {
  testPlan: TestPlanType;
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
  const menuItems: MenuItem[] = [
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <EditIcon color="black" />
          Edit
        </div>
      ),
      onClick: () => onEdit(testPlan.planId),
    },
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <DeleteIcon color="#C03744" />
          Delete
        </div>
      ),
      onClick: () => onRemove(testPlan.planId),
    },
  ];
  return (
    <div className="test-plan__row">
      <div className="test-plan__cell">
        <Checkbox isActiveMainCheckbox={isActiveCheckbox} />
        {testPlan.planName}
      </div>
      <div className="test-plan__cell">{testPlan.createdAt}</div>
      <div className="test-plan__cell">{testPlan.updatedAt}</div>
      <div className="test-plan__cell">{testPlan.casesCount} test cases</div>
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
