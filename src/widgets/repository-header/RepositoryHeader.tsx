import { useState } from "react";

import CloneIcon from "@/assets/svgs/CloneIcon";
import DeleteIcon from "@/assets/svgs/DeleteIcon";
import EditIcon from "@/assets/svgs/EditIcon";
import PlusIcon from "@/assets/svgs/PlusIcon";
import RunIcon from "@/assets/svgs/RunIcon";
import { mockProjectId } from "@/config/mockData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { useAppSelector } from "@/shared/hooks/ReduxHooks";
import Button from "@/shared/ui/button/Button";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";
import Search from "src/shared/ui/search/Search";
import AddSuiteModal from "src/widgets/modal-windows/AddSuiteModal";
import "./RepositoryHeader.css";
type RepositoryHeaderProps = {
  repositoryName: string;
};

const RepositoryHeader = ({
  repositoryName: repositoryName,
}: RepositoryHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suiteId: "",
    suiteName: "",
    children: [],
  });
  const openedSuite = useAppSelector(
    (state) => state["ONE_LEVEL_REDUCER"]?.data,
  );
  const openAddSuiteModal = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setModalOpen(true);
  };
  return (
    <div className="repository-header">
      <AddSuiteModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        suites={allSuites.children}
      />
      <div className="repository-header__info">
        <span className="repository-name__info--name">
          {repositoryName} repository
        </span>
      </div>
      <div className="repository-header__buttons">
        <Button
          className="repository-header__buttons--add"
          onClick={openAddSuiteModal}
        >
          <PlusIcon /> Suite
        </Button>
        <Button className="repository-header__buttons--add">
          <PlusIcon /> Case
        </Button>
        {openedSuite?.suiteId ? (
          <>
            <Button className="repository-header__button-additional">
              <RunIcon /> Run
            </Button>
            <Button className="repository-header__button-additional">
              <EditIcon /> Edit
            </Button>
            <Button className="repository-header__button-additional">
              <CloneIcon /> Clone
            </Button>
            <Button className="repository-header__button-additional">
              <DeleteIcon /> Delete
            </Button>
          </>
        ) : null}
        <Search />
      </div>
    </div>
  );
};

export default RepositoryHeader;
