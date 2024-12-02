import "src/shared/ui/input/Input.css";

import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ onChange, ...inputProps }: InputProps) => {
  return (
    <input
      {...inputProps}
      className={"input"}
      onChange={onChange}
    />
  );
};

export default Input;
