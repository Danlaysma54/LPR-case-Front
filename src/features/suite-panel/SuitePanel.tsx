import './SuitePanel.css'
import MoreIcon from "src/assets/svgs/MoreIcon";
import FolderIcon from "src/assets/svgs/FolderIcon";

type SuitePanelProps = {
  name: string;
  isSelected?: boolean;
}

const SuitePanel = ({
                      name: name,
                      isSelected: isSelected = false
                    }: SuitePanelProps) => {
  return (
    <div className={`suite-panel ${isSelected ? "suite-panel--selected" : ""}`}>
      <MoreIcon />
      <input type={"checkbox"} className="suite-panel__checkbox" />
      <FolderIcon color="#656565"/>
      {name}
    </div>
  )
}

export default SuitePanel;

