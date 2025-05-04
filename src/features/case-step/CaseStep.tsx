import "./CaseStep.css";
import { useEffect } from "react";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import PlusIcon from "@/assets/svgs/PlusIcon";
import DropdownMenu, { MenuItem } from "@/shared/ui/dropdown-menu/DropdownMenu";
import Input from "@/shared/ui/input/Input";
import { AddCaseStepsType } from "@/types/UnitsType";

type CaseStepProps = {
  index: number;
  step: AddCaseStepsType;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  onCreate: () => void;
};

const CaseStep = ({
  index,
  step,
  onChange,
  onRemove,
  onCreate,
}: CaseStepProps) => {
  const caseActions: MenuItem[] = [
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <PlusIcon color="black" />
          Add step
        </div>
      ),
      onClick: () => onCreate(),
    },
    {
      label: (
        <div style={{ display: "flex", gap: "11px" }}>
          <DeleteIcon color="#C03744" />
          Delete
        </div>
      ),
      onClick: () => onRemove(index),
    },
  ];
  useEffect(() => {
    step.stepNumber = index + 1;
  }, []);
  return (
    <div className="case-step">
      <div className="case-step__index">{index + 1}</div>
      <Input
        type="text"
        value={step.stepDescription}
        onChange={(e) => onChange(index, "stepDescription", e.target.value)}
        placeholder="Step Action"
        className="case-step__input"
      />
      <Input
        type="text"
        value={step.stepData}
        onChange={(e) => onChange(index, "stepData", e.target.value)}
        placeholder="Data"
        className="case-step__input"
      />
      <Input
        type="text"
        value={step.stepResult}
        onChange={(e) => onChange(index, "stepResult", e.target.value)}
        placeholder="Expected result"
        className="case-step__input"
      />
      <DropdownMenu items={caseActions} />
    </div>
  );
};

export default CaseStep;
