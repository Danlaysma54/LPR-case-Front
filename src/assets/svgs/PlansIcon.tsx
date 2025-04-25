type PlansIconProps = {
  color?: string;
};

const PlansIcon = ({ color }: PlansIconProps = { color: "#393939" }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_425_10356)">
      <path d="M7.5 4H12V5H7.5V4Z" fill={color || "currentColor"} />
      <path d="M7.5 6H12V7H7.5V6Z" fill={color || "currentColor"} />
      <path d="M7.5 8H12V9H7.5V8Z" fill={color || "currentColor"} />
      <path d="M7.5 10H12V11H7.5V10Z" fill={color || "currentColor"} />
      <path d="M7.5 12H12V13H7.5V12Z" fill={color || "currentColor"} />
      <path d="M5.5 4H6.5V5H5.5V4Z" fill={color || "currentColor"} />
      <path d="M5.5 6H6.5V7H5.5V6Z" fill={color || "currentColor"} />
      <path d="M5.5 8H6.5V9H5.5V8Z" fill={color || "currentColor"} />
      <path d="M5.5 10H6.5V11H5.5V10Z" fill={color || "currentColor"} />
      <path d="M5.5 12H6.5V13H5.5V12Z" fill={color || "currentColor"} />
      <path
        d="M14 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V16C3 16.2652 3.10536 16.5196 3.29289 16.7071C3.48043 16.8946 3.73478 17 4 17H14C14.2652 17 14.5196 16.8946 14.7071 16.7071C14.8946 16.5196 15 16.2652 15 16V2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1ZM14 16H4V2H14V16Z"
        fill={color || "currentColor"}
      />
    </g>
    <defs>
      <clipPath id="clip0_425_10356">
        <rect width="18" height="18" fill={color || "currentColor"} />
      </clipPath>
    </defs>
  </svg>
);

export default PlansIcon;
