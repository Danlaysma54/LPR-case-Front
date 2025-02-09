import "./CasesBlock.css";

import CasePanel from "src/features/case-panel/CasePanel";
import SuitePanel from "src/features/suite-panel/SuitePanel";
import { useAppSelector } from "src/shared/hooks/ReduxHooks";

type CasesBlockProps = {
  headerTitle: string;
};

const CasesBlock = ({ headerTitle: headerTitle }: CasesBlockProps) => {
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );

  return (
    <div className="cases-block">
      <div className="cases-block__title">{headerTitle} </div>
      <ul className="cases-block__suites-list">
        {openedSuite?.suiteContent.suites
          ? openedSuite?.suiteContent.suites.map((suite) => {
              return (
                <li key={suite.suiteId} className="cases-block__suites">
                  <SuitePanel name={suite.suiteName} />
                </li>
              );
            })
          : null}
        {openedSuite?.suiteContent?.suites
          ? openedSuite?.suiteContent.cases.map((el) => {
              return (
                <li key={el.caseId} className="cases-block__cases">
                  <CasePanel name={el.caseName} caseId={el.caseId} />
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default CasesBlock;
