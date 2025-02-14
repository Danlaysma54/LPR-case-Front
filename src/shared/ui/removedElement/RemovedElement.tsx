import "./RemovedElement.css";

import { Properties } from "csstype";

import CloseIcon from "@/assets/svgs/CloseIcon";

import PendingDeletion from "@/interfaces/PendingDeletion";
import Button from "@/shared/ui/button/Button";
import { SuiteType } from "@/types/UnitsType";

type RemovedElementProps = {
  pending: PendingDeletion<SuiteType>;
  onUndo: (pending: PendingDeletion<SuiteType>) => void;
  onConfirm: (suiteId: string) => void;
  className?: string;
  style?: Properties<string | number>;
};

const RemovedElement = (removedElementProps: RemovedElementProps) => {
  return (
    <div style={removedElementProps.style} className="removed-element-window">
      <CloseIcon
        className={`removed-element-window__close ${removedElementProps.className}`}
        onClose={() =>
          removedElementProps.onConfirm(removedElementProps.pending.id)
        }
      />
      <div className="removed-element-window__text}">
        You deleted {removedElementProps.pending.data.suiteName}
      </div>
      <Button
        className="removed-element-window__button"
        onClick={() => removedElementProps.onUndo(removedElementProps.pending)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default RemovedElement;
