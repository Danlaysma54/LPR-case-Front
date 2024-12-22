import './SuitesBlock.css'

import { useEffect, useState } from 'react';
import MenuIcon from "src/assets/svgs/MenuIcon";
import { mockProjectId } from "src/config/mockData";
import { getOneLevelSuite } from 'src/entites/OneLevel/api/GetOneLevelData';
import Suite from "src/features/suite/Suite";
import { SuiteType } from "src/types/UnitsType";

const SuitesBlock = () => {
  const [suites,setSuites]= useState<SuiteType[]>([]);
  useEffect(()=>{
    getOneLevelSuite({ projectId: mockProjectId,suiteId: mockProjectId }).then((response)=>
      {
        setSuites(response.suites);
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