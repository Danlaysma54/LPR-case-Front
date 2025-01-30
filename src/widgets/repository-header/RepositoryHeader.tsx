import "./RepositoryHeader.css";

import { useState } from "react";
import AddButton from "src/shared/ui/add-button/AddButton";
import Search from "src/shared/ui/search/Search";
import AddSuiteModal from "src/widgets/modal-windows/AddSuiteModal";

import { mockProjectId } from "@/config/mockData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";

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
        <AddButton onClick={openAddSuiteModal}>Suite</AddButton>
        <AddButton>Case</AddButton>
        <Search />
      </div>
    </div>
  );
};

export default RepositoryHeader;
