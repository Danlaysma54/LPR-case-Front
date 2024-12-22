import './CasesBlock.css'
import { CaseType, SuiteType } from "src/types/UnitsType";
import SuitePanel from "src/features/suite-panel/SuitePanel";

type CasesBlockProps = {
  headerTitle: string
}

const CasesBlock = ({
                      headerTitle: headerTitle
}: CasesBlockProps) => {
  return (
    <div className="cases-block">
      <div className="cases-block__title">{headerTitle} </div>
      <ul className="cases-block__cases-list">
      </ul>
    </div>
  )
}

export default CasesBlock;