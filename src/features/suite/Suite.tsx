import './Suite.css'

import DownArrow from "src/assets/svgs/DownArrow";
import FolderIcon from "src/assets/svgs/FolderIcon";

type SuiteProps = {
  suiteName: string;
  opened?: boolean;
  childCount: number

}
const Suite = ({
                 suiteName: suiteName,
                 opened: opened = false,
                 childCount
}: SuiteProps) => {
  return (
    <div className="suite">
      <div className="suite__left-side">
        {opened ? <div className="suite__left-side--arrow" ><DownArrow/> </div>: null}
        <FolderIcon color={"#393939"}/>
        <div className="suite__title">{suiteName}</div>
      </div>
      <span className="suite__child-count">{childCount}</span>
    </div>
  )
}


export default Suite;