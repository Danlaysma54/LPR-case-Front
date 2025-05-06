import { useEffect, useState } from "react";

import DeleteIcon from "@/assets/svgs/DeleteIcon";
import { mockProjectId } from "@/config/mockData";
import { getCaseById } from "@/entites/Case/api/CaseApi";
import { GetTestCaseByIdResponseType } from "@/types/UnitsType";

type CaseInPlanProps = {
  caseId: string;
  onRemoveCase: (caseId: string) => void;
  key: string;
};

const CaseInPlan = ({ caseId, onRemoveCase, key }: CaseInPlanProps) => {
  const [testCase, setTestCase] = useState<GetTestCaseByIdResponseType | null>(
    null,
  );

  useEffect(() => {
    getCaseById(mockProjectId, caseId).then((r) => setTestCase(r));
  }, []);

  return (
    <li key={key} className="selected-case">
      <button
        className="delete-case__button"
        type="button"
        onClick={() => onRemoveCase(caseId)}
      >
        <DeleteIcon color={"#C03744"} />
      </button>
      <p className="selected-case-name">{testCase?.testCaseName}</p>
    </li>
  );
};

export default CaseInPlan;
