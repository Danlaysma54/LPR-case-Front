import './CasePanel.css'

import HandIcon from "src/assets/svgs/HandIcon";
import { useAppSelector } from "src/shared/hooks/ReduxHooks";

type SuitePanelProps = {
  name: string;
  serialNumber: number;
}

const CasePanel = ({
                      name: name,
                      serialNumber: serialNumber
                    }: SuitePanelProps) => {
  const projectShortName = useAppSelector((state) => state["PROJECT_DATA_REDUCER"]?.data.project.projectShortName)

  return (
    <div className="case-panel">
      <input type={"checkbox"} className="case-panel__checkbox" />
      <div className="dash"/>
      <HandIcon/>
      <div className="case-panel__project-info">{projectShortName}-{serialNumber}</div>
      <div className="case-panel__name">{name}</div>
    </div>
  )
}

export default CasePanel;

