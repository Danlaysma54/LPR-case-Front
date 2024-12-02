import './SuitesBlock.css'

import MenuIcon from "src/assets/svgs/MenuIcon";
import { SuiteType } from "src/types/UnitsType";
import Suite from "src/features/suite/Suite";

type SuitesBlockProps = {
  suites: SuiteType[];
}

const SuitesBlock = ({ suites: suites }: SuitesBlockProps) => {
  return (
    <div className="suites-block">
      <div className="suites-block__header">
        <MenuIcon/>
        <div className="suites-block__title">Suites</div>
      </div>
      <ul className="suites-block__suites-list">
        {
          suites.map((suite, index) => {
            return <li key={index} className="suites-list--el"><Suite suiteName={suite.name} childCount={suite.childCount} /> </li>
          })
        }
      </ul>
    </div>
  )
}


export default SuitesBlock;