import SearchIcon from "src/assets/svgs/SearchIcon";
import { UseFormField } from "src/shared/hooks/UseFormField";
import Input from "src/shared/ui/input/Input";
import './Search.css'

const Search = () => {
  const searchField = UseFormField();
  return (
    <div className="search">
      <SearchIcon className="search-icon"/>
      <Input {...searchField} placeholder="Search"/>
    </div>
  )
}

export default Search