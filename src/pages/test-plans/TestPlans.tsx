import { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import PlusIcon from "@/assets/svgs/PlusIcon";
import { mockProjectId } from "@/config/mockData";
import { getAllTestPlans } from "@/entites/TestPlan/api/TestPlanApi";
import Button from "@/shared/ui/button/Button";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import Search from "@/shared/ui/search/Search";
import { TestPlanResponseType } from "@/types/UnitsType";

import "./TestPlans.css";
import DeletePlanModal from "@/widgets/delete-plan-modal/DeletePlanModal";
import TestPlanRow from "@/widgets/test-plan-row/TestPlanRow";

const TestPlans = () => {
  const [testPlans, setTestPlans] = useState<TestPlanResponseType[]>([]);
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  const [testPlanIdForDelete, setTestPlanIdForDelete] = useState<string | null>(
    null,
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const getTestPlans = () => {
    getAllTestPlans({ projectId: mockProjectId }).then((res) =>
      setTestPlans(res.testPlans),
    );
  };

  useEffect(() => {
    getTestPlans();
  }, []);

  const onOpenDeleteModal = (id: string) => {
    setTestPlanIdForDelete(id);
    setIsDeleteModalOpen(true);
  };

  const onCloseDeleteModal = () => {
    setTestPlanIdForDelete(null);
    setIsDeleteModalOpen(false);
    getTestPlans();
  };

  const toCreatePlan = () => {
    navigate("/create-plan");
  };

  const onEdit = (id: string) => {
    navigate(`/plans/${id}`);
  };
  const onRemove = (id: string) => {
    onOpenDeleteModal(id);
  };
  return (
    <div className="test-plan">
      <ModalWindow isOpened={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <DeletePlanModal
          onClose={onCloseDeleteModal}
          testPlanId={testPlanIdForDelete}
        />
      </ModalWindow>
      <div className="test-plan__header">
        <h1 className="test-plan__title">Test plans</h1>
        <div className="test-plan__interact">
          <Button onClick={toCreatePlan}>
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
            key={testPlan.testPlanId}
            testPlan={testPlan}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default TestPlans;
