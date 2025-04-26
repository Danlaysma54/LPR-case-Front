import "./LeftSide.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

import PlansIcon from "@/assets/svgs/PlansIcon";
import RepositoryIcon from "@/assets/svgs/RepositoryIcon";
import RunIcon from "@/assets/svgs/RunIcon";
import { useAppSelector } from "@/shared/hooks/ReduxHooks";

const LeftSide = () => {
  const projectName = useAppSelector(
    (state) => state["PROJECT_DATA_REDUCER"].data?.project.projectName,
  );
  const repPage = "/";
  const plansPage = "/plans";
  const runsPage = "/runs";

  const location = useLocation();
  const navigate = useNavigate();
  const isRepositoryActive = location.pathname === repPage;
  const isPlansActive = location.pathname.includes(plansPage);
  const isRunsActive = location.pathname.includes(runsPage);

  const openPage = (page: string) => {
    navigate(page);
  };

  return (
    <div className="left-side">
      <div className="left-side__project-info">
        <div className="left-side__avatar"></div>
        <h3 className="left-side__project-name">{projectName}</h3>
      </div>
      <div className="left-side__line"></div>
      <div className="left-side__tests">
        <div className="left-side__title">tests</div>
        <button
          disabled={isRepositoryActive}
          onClick={() => openPage(repPage)}
          className={`left-side__block ${isRepositoryActive ? "active" : ""}`}
        >
          <RepositoryIcon />
          <p>Repository</p>
        </button>
      </div>
      <div className="left-side__execution">
        <div className="left-side__title">execution</div>
        <div className="left-side__execution-blocks">
          <button
            disabled={isPlansActive}
            onClick={() => openPage(plansPage)}
            className={`left-side__block ${isPlansActive ? "active" : ""}`}
          >
            <PlansIcon />
            <p>Tests plans</p>
          </button>
          <button
            onClick={() => openPage(runsPage)}
            className={`left-side__block ${isRunsActive ? "active" : ""}`}
          >
            <RunIcon />
            <p>Tests runs</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
