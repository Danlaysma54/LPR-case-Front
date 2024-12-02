import './RepositoryHeader.css'
import AddButton from "src/shared/ui/add-button/AddButton";
import Search from "src/shared/ui/search/Search";

type RepositoryHeaderProps = {
  repositoryName: string;
  suitesCount: number;
  casesCount: number

}

const RepositoryHeader = ({
                            repositoryName: repositoryName,
                            casesCount: casesCount,
                            suitesCount: suitesCount
                          }: RepositoryHeaderProps) => {
  return (
    <div className="repository-header">
      <div className="repository-header__info">
        <span className="repository-name__info--name">{repositoryName} repository</span>
          <span className="repository-name__info--cases">
            {casesCount} cases ({casesCount}) | {suitesCount} suites ({suitesCount})
          </span>
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