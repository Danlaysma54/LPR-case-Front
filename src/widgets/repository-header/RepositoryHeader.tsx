import "./RepositoryHeader.css";

import { useState } from "react";
import AddButton from "src/shared/ui/add-button/AddButton";
import Search from "src/shared/ui/search/Search";
import AddSuiteModal from "src/widgets/modal-windows/AddSuiteModal";

import { GetSuitesByProjectIdResponseType } from "@/types/UnitsType";

type RepositoryHeaderProps = {
  repositoryName: string;
};

const RepositoryHeader = ({
  repositoryName: repositoryName,
}: RepositoryHeaderProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [AllSuites, setAllSuites] = useState<GetSuitesByProjectIdResponseType>({
    suites: [],
  });
  const openAddSuiteModal = () => {
    //getAllSuitesByProjectId({ projectId: mockProjectId }).then((res) => (
    //setAllSuites(res)
    //))
    setAllSuites({
      suites: [
        {
          suiteId: "ad192b5b-5096-4cc9-bd5f-8bf4aaa02c4b",
          suiteName: "first_suite",
        },
        {
          suiteId: "ad192b5b-5096-4cc9-bd5f-8bf4aaa02c4d",
          suiteName: "aaaa",
        },
      ],
    });
    setModalOpen(true);
  };
  return (
    <div className="repository-header">
      <AddSuiteModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        suites={AllSuites}
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
