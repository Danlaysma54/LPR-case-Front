import "src/shared/ui/input/Input.css";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string
};

const Input = ({ onChange, className, ...inputProps }: InputProps) => {
  return (
    <input
      {...inputProps}
      className={`input ${className}`}
      onChange={onChange}
    />
  );
};

export default Input;
