import "./AddButton.css"
import PlusSvg from "src/assets/svgs/PlusIcon";


export type ButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: string | React.ReactNode;
};

const AddButton = ({
                  className = "",
                  onClick = () => {},
                  disabled = false,
                  children,
                }: ButtonProps) => (
  <button
    className={`add-button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    <PlusSvg/>
    {children}
  </button>
);

export default AddButton;