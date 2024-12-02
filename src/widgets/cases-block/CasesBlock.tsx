import './CasesBlock.css'
import { CaseType, SuiteType } from "src/types/UnitsType";
import SuitePanel from "src/features/suite-panel/SuitePanel";

type CasesBlockProps = {
  headerTitle: string
  cases: CaseType[] | SuiteType[];
}

const CasesBlock = ({
                      cases: cases,
                      headerTitle: headerTitle
}: CasesBlockProps) => {
  return (
    <div className="cases-block">
      <div className="cases-block__title">{headerTitle} </div>
      <ul className="cases-block__cases-list">
        {cases.map((el, index) => {
          return <li key={index} className="cases-list--el">{<SuitePanel name={el.name} />
          }</li>
        })}
      </ul>
    </div>
  )
}

export default CasesBlock;