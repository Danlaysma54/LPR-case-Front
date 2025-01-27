import React from "react";

export const UseFormField = (initialValue: string = "") => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    [],
  );
  return { value, onChange };
};
