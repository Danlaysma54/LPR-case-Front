import { useEffect, useState } from "react";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
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
  const [isMainCheckState, setIsMainCheckState] = useState<boolean>(false);
  const [isManuallyChanged, setIsManuallyChanged] = useState<boolean>(false); // <- добавили

  const checkMainState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsManuallyChanged(true);
    setIsMainCheckState(event.target.checked);
  };

  useEffect(() => {
    setIsMainCheckState(isActiveCheckbox);
  }, [isActiveCheckbox]);

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

  const checkboxChecked = isManuallyChanged
    ? isMainCheckState
    : isActiveCheckbox;

  return (
    <div className="test-plan__row">
      <div className="test-plan__cell">
        <input
          type="checkbox"
          onChange={checkMainState}
          checked={checkboxChecked}
          className="test-plan__checkbox"
        />
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
