import './SuitesBlock.css'

import MenuIcon from "src/assets/svgs/MenuIcon";
import { OneLevelSuites, suite, SuiteType } from "src/types/UnitsType";
import Suite from "src/features/suite/Suite";
import { useEffect, useState } from 'react';
import { getOneLevelSuite } from 'src/entites/OneLevel/api/GetOneLevelData';
type OneLevelProps = {
  oneLevel: suite
}
const SuitesBlock = () => {
  const [suites,setSuites]= useState<suite[]>([]);
  useEffect(()=>{
    getOneLevelSuite({projectId:"a96d34f1-d20e-4c1b-bfdc-76f4c20c3b8c",suiteId:"a96d34f1-d20e-4c1b-bfdc-76f4c20c3b8c"}).then((response)=>
      {
        setSuites(response.suites);
        console.log(response.suites)
      });
    },[]);
  return (
    <div className="suites-block">
      <div className="suites-block__header">
        <MenuIcon/>
        <div className="suites-block__title">Suites</div>
      </div>
      <ul className="suites-block__suites-list">
        {
          suites.map((suite, index) => {
            return <li key={index} className="suites-list--el"><Suite suiteName={suite.suiteName} childCount={suite.numberOfChild}  /> </li>
          })
        }
      </ul>
    </div>
  )
}


export default SuitesBlock;