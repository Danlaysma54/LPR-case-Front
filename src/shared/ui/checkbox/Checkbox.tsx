import { useEffect, useState } from "react";

type checkboxProps = {
  isActiveMainCheckbox: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
};

const Checkbox = ({
  isActiveMainCheckbox,
  className,
  onChange,
}: checkboxProps) => {
  const [isMainCheckState, setIsMainCheckState] = useState<boolean>(false);
  const [isManuallyChanged, setIsManuallyChanged] = useState<boolean>(false);
  const checkMainState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsManuallyChanged(true);
    setIsMainCheckState(event.target.checked);
    onChange?.(checked);
  };

  useEffect(() => {
    setIsMainCheckState(isActiveMainCheckbox);
  }, [isActiveMainCheckbox]);

  const checkboxChecked = isManuallyChanged
    ? isMainCheckState
    : isActiveMainCheckbox;
  return (
    <input
      type="checkbox"
      onChange={checkMainState}
      checked={checkboxChecked}
      className={className ? className : "test-plan__checkbox"}
    />
  );
};

export default Checkbox;
