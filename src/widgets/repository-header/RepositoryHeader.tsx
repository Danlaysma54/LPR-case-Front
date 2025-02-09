import "./RepositoryHeader.css";

import { useState } from "react";
import AddButton from "src/shared/ui/add-button/AddButton";
import Search from "src/shared/ui/search/Search";
import AddSuiteModal from "src/widgets/modal-windows/AddSuiteModal";

import { mockProjectId } from "@/config/mockData";
import { getAllSuitesByProjectId } from "@/entites/Suites/api/SuiteApi";
import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";
import AddCaseModal from "@/widgets/modal-windows/AddCaseModal";

type RepositoryHeaderProps = {
  repositoryName: string;
};

const RepositoryHeader = ({
  repositoryName: repositoryName,
}: RepositoryHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCaseModalOpen, setCaseModalOpen] = useState(false);
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
  const openAddCaseModal = () => {
    getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) =>
      setAllSuites(res),
    );
    setCaseModalOpen(true);
  };
  return (
    <div className="repository-header">
      <AddCaseModal
        isModalOpen={isCaseModalOpen}
        setModalOpen={setCaseModalOpen}
        suites={allSuites.children}
      />
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
        <AddButton onClick={openAddCaseModal}>Case</AddButton>
        <Search />
      </div>
    </div>
  );
};

export default RepositoryHeader;
