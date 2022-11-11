import React from "react";
import { ControlWrapper } from ".";

type SocialFieldProps = {
  value: boolean;
  onChange: (param: boolean) => void;
};

function SocialField(props: SocialFieldProps): JSX.Element {
  const { value, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(parseInt(e.target.value, 10) > 0);
  };

  return (
    <ControlWrapper title="Display social media counts?">
      <select
        className="search-option-control"
        value={value ? "1" : "0"}
        onChange={handleChange}
      >
        <option value="1">Yes</option>
        <option value="0">No</option>
      </select>
    </ControlWrapper>
  );
}

export default SocialField;
