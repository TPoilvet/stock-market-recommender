import React from "react";
import { ControlWrapper } from ".";

const options = [
  { id: 1, name: "Standard" },
  { id: 2, name: "Reversed Hype" },
  { id: 3, name: "Oh God It's Friday" },
];

type AlgorithFieldProps = {
  value: number;
  onChange: (param: number) => void;
};

function AlgorithField(props: AlgorithFieldProps): JSX.Element {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <ControlWrapper title="Select an algorithm" required>
      <select
        className="search-option-control"
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </ControlWrapper>
  );
}

export default AlgorithField;
