import './CasesBlock.css'

import { useAppSelector } from "src/shared/hooks/ReduxHooks";
import CasePanel from "src/features/case-panel/CasePanel";
import { useEffect, useState } from "react";
import { SuiteContentType } from "src/types/UnitsType";
import SuitePanel from "src/features/suite-panel/SuitePanel";

type CasesBlockProps = {
  headerTitle: string
}

const CasesBlock = ({
                      headerTitle: headerTitle
}: CasesBlockProps) => {
  const openedOneLevel = useAppSelector((state) => state["ONE_LEVEL_REDUCER"]?.data )
  const openedSuiteId = localStorage.getItem("openedSuiteId")
  const [openedSuite, setOpenedSuite] = useState<SuiteContentType>();
  useEffect(() => {
    if (openedSuiteId && openedOneLevel) {
      const openedOneLevelSuite = openedOneLevel.find((el) => {return el.suiteId = openedSuiteId})?.suiteContent
      setOpenedSuite(openedOneLevelSuite)
    }
  }, [openedOneLevel, openedSuiteId]);
  return (
    <div className="cases-block">
      <div className="cases-block__title">{headerTitle} </div>
      <ul className="cases-block__suites-list">
        {openedSuite?.suites ?
        openedSuite.suites.map((suite) => {
          return <li key={suite.suiteId} className="cases-block__suites">
            <SuitePanel name={suite.suiteName}/>
          </li>
        })
          : null}
        {openedSuite?.suites ?
          openedSuite.cases.map((el) => {
            return <li key={el.caseId} className="cases-block__cases">
              <CasePanel name={el.name} serialNumber={el.serialNumber}/>
            </li>
          })
          : null}
      </ul>
    </div>
  )
}

export default CasesBlock;