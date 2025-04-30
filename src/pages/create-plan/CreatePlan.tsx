import "./CreatePlan.css";
import { useState } from "react";
import { useNavigate } from "react-router";

import BackArrow from "@/assets/svgs/BackArrow";
import PlusIcon from "@/assets/svgs/PlusIcon";
import { UseFormField } from "@/shared/hooks/UseFormField";
import Button from "@/shared/ui/button/Button";
import Input from "@/shared/ui/input/Input";
import ModalWindow from "@/shared/ui/modal-window/ModalWindow";
import SelectCasesModal from "@/widgets/select-cases-modal/SelectCasesModal";

const CreatePlan = () => {
  const navigate = useNavigate();
  const titleField = UseFormField();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="create-plan">
      <ModalWindow
        className="select-cases__modal"
        onClose={onCloseModal}
        isOpened={isModalOpen}
      >
        <SelectCasesModal closeModal={onCloseModal} />
      </ModalWindow>
      <div className="create-plan__navigation">
        <button
          className="create-plan_back-button"
          onClick={() => {
            navigate("/");
          }}
        >
          <BackArrow />
        </button>
        <h1 className="create-plan__title">Create test plan</h1>
      </div>
      <div className="create-plan__topic">Plan details</div>
      <form className="create-plan__form">
        <div className="create-plan__form-content">
          <div className="create-plan__form-title">
            <label className="create-plan__label" htmlFor="title">
              Title
            </label>
            <Input
              className="create-plan__form-input"
              onChange={titleField.onChange}
              placeholder="For example: Authorization"
            ></Input>
          </div>
          <div className="create-plan__form-info">
            <Button
              className="create-plan__add-step"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <PlusIcon />
              Add test cases
            </Button>
          </div>
        </div>
        <div className="create-plan__form-border"></div>
        <div className="create-plan__form-buttons">
          <Button type="button">Create plan</Button>
          <Button
            type="button"
            className="create-plan__cancel"
            onClick={() => {
              navigate("/plans");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlan;
