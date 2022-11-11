import React from "react";
import { ControlWrapper } from ".";

type SymbolFieldProps = {
  value: string;
  onChange: (param: string) => void;
};

function SymbolField(props: SymbolFieldProps) {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  return (
    <ControlWrapper title="Enter a stock symbol" required>
      <input
        className="search-option-control"
        type="text"
        value={value}
        onChange={handleChange}
      />
    </ControlWrapper>
  );
}

export default SymbolField;
