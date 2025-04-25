import "./LeftSide.css";
import PlansIcon from "@/assets/svgs/PlansIcon";
import RepositoryIcon from "@/assets/svgs/RepositoryIcon";
import RunIcon from "@/assets/svgs/RunIcon";
import { useAppSelector } from "@/shared/hooks/ReduxHooks";

const LeftSide = () => {
  const projectName = useAppSelector(
    (state) => state["PROJECT_DATA_REDUCER"].data?.project.projectName,
  );
  return (
    <div className="left-side">
      <div className="left-side__project-info">
        <div className="left-side__avatar"></div>
        <h3 className="left-side__project-name">{projectName}</h3>
      </div>
      <div className="left-side__line"></div>
      <div className="left-side__tests">
        <div className="left-side__title">tests</div>
        <div className="left-side__block">
          <RepositoryIcon />
          <p>Repository</p>
        </div>
      </div>
      <div className="left-side__execution">
        <div className="left-side__title">execution</div>
        <div className="left-side__execution-blocks">
          <div className="left-side__block">
            <PlansIcon />
            <p>Tests plans </p>
          </div>
          <div className="left-side__block">
            <RunIcon color="#393939" />
            <p> Tests runs </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
