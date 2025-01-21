import './RepositoryHeader.css'
import AddButton from "src/shared/ui/add-button/AddButton";
import Search from "src/shared/ui/search/Search";

type RepositoryHeaderProps = {
  repositoryName: string;
}

const RepositoryHeader = ({
                            repositoryName: repositoryName,
                          }: RepositoryHeaderProps) => {
  return (
    <div className="repository-header">
      <div className="repository-header__info">
        <span className="repository-name__info--name">{repositoryName} repository</span>

      </div>
      <div className="repository-header__buttons">
        <AddButton>Suite</AddButton>
        <AddButton>Case</AddButton>
        <Search/>
      </div>
    </div>
  )
}

export default RepositoryHeader;