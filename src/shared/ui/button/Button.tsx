import "./Button.css";

import React from "react";

export type ButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: string | React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
};

const Button = ({
  className = "",
  onClick = () => {},
  disabled = false,
  children,
  type,
}: ButtonProps) => (
  <button
    type={type}
    className={`custom-button ${className} `}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
