type SearchIconProps = {
  className?: string;
};

const SearchIcon = ({ className: className }: SearchIconProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.0625 0.625C3.05945 0.625 0.625 3.05945 0.625 6.0625C0.625 9.06555 3.05945 11.5 6.0625 11.5C7.32074 11.5 8.47916 11.0726 9.40052 10.3551L12.5977 13.5523C12.8613 13.8159 13.2887 13.8159 13.5523 13.5523C13.8159 13.2887 13.8159 12.8613 13.5523 12.5977L10.3551 9.40054C11.0726 8.47918 11.5 7.32075 11.5 6.0625C11.5 3.05945 9.06555 0.625 6.0625 0.625ZM6.0625 1.975C3.80504 1.975 1.975 3.80504 1.975 6.0625C1.975 8.31996 3.80504 10.15 6.0625 10.15C8.31996 10.15 10.15 8.31996 10.15 6.0625C10.15 3.80504 8.31996 1.975 6.0625 1.975Z"
        fill="#BABABA"
      />
    </svg>
  );
};

export default SearchIcon;
