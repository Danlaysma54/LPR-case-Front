import "./Button.css";

import React from "react";

export type ButtonProps = {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: string | React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
  style?: { backgroundColor: string };
};

const Button = ({
  className = "",
  onClick = () => {},
  disabled = false,
  children,
  type,
  style,
}: ButtonProps) => (
  <button
    style={style}
    type={type}
    className={`custom-button ${className} `}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
