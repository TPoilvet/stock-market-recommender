import React from "react";
import { ControlWrapper } from ".";

type PeriodFieldProps = {
  value: number;
  onChange: (param: number) => void;
};

const options = [5, 10, 30, 45];

function PeriodField(props: PeriodFieldProps): JSX.Element {
  const { value, onChange } = props;

  return (
    <ControlWrapper title="Select a time period" required>
      <div className="search-social-field">
        {options.map((option) => (
          <div
            key={option}
            className={option === value ? "selected" : ""}
            onClick={() => onChange(option)}
          >
            {option}D
          </div>
        ))}
      </div>
    </ControlWrapper>
  );
}

export default PeriodField;
