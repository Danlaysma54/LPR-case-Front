import "./CasePanel.css";

import HandIcon from "src/assets/svgs/HandIcon";

type CasePanelProps = {
  name: string;
};

const CasePanel = ({ name: name }: CasePanelProps) => {
  return (
    <div className="case-panel">
      <input type={"checkbox"} className="case-panel__checkbox" />
      <div className="dash" />
      <HandIcon />
      <div className="case-panel__name">{name}</div>
    </div>
  );
};

export default CasePanel;
