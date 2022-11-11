import React from "react";

type ControlWrapperProps = {
  children: JSX.Element;
  title: string;
  required?: boolean;
};

function ControlWrapper(props: ControlWrapperProps): JSX.Element {
  const { children, title, required } = props;

  return (
    <div className="search-option">
      <div className="search-option-title">
        <span>{title}</span>
        {required && <span className="search-option-required">Required</span>}
      </div>
      {children}
    </div>
  );
}

export default ControlWrapper;
