import React from "react";

type ButtonProps = {
  disabled?: boolean;
  children: JSX.Element | string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

function Button(props: ButtonProps): JSX.Element {
  const { children, onClick, disabled } = props;
  return (
    <button className={disabled ? "disabled" : ""} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
