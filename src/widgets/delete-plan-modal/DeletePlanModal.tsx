import { mockProjectId } from "@/config/mockData";
import { deleteTestPlan } from "@/entites/TestPlan/api/TestPlanApi";
import Button from "@/shared/ui/button/Button";

import "./DeletePlanModal.css";

type DeletePlanModalProps = {
  testPlanId: string | null;
  onClose: () => void;
};

const DeletePlanModal = ({ testPlanId, onClose }: DeletePlanModalProps) => {
  const onDelete = async () => {
    if (!testPlanId) {
      onClose();
      return;
    }
    await deleteTestPlan(mockProjectId, testPlanId!);
    onClose();
  };

  return (
    <div className="delete-plan">
      <h1 className="delete-plan__title">Are you sure?</h1>
      <div className="delete-plan__buttons">
        <Button className="create-plan__cancel" onClick={onClose}>
          No
        </Button>
        <Button onClick={onDelete}>Yes</Button>
      </div>
    </div>
  );
};

export default DeletePlanModal;
