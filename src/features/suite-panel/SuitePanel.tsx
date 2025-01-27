import "./SuitePanel.css";

import FolderIcon from "src/assets/svgs/FolderIcon";
import MoreIcon from "src/assets/svgs/MoreIcon";

type SuitePanelProps = {
  name: string;
  isSelected?: boolean;
};

const SuitePanel = ({
  name: name,
  isSelected: isSelected = false,
}: SuitePanelProps) => {
  return (
    <div className={`suite-panel ${isSelected ? "suite-panel--selected" : ""}`}>
      <MoreIcon />
      <input type={"checkbox"} className="suite-panel__checkbox" />
      <FolderIcon color="#656565" />
      {name}
    </div>
  );
};

export default SuitePanel;
