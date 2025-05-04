import "./Search.css";

import SearchIcon from "src/assets/svgs/SearchIcon";
import { UseFormField } from "src/shared/hooks/UseFormField";
import Input from "src/shared/ui/input/Input";

type searchProps = {
  className?: string;
  placeholder?: string;
};

const Search = ({ className, placeholder }: searchProps) => {
  const searchField = UseFormField();
  return (
    <div className="search">
      <SearchIcon className="search-icon" />
      <Input
        {...searchField}
        className={className}
        placeholder={placeholder ? placeholder : "Search"}
      />
    </div>
  );
};

export default Search;
