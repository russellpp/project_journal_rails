import React, { useState } from "react";
import styled from "styled-components";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  return <CircleCheckbox checked={checked} onClick={handleCheckboxClick} />;
};

const CircleCheckbox = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid var(--lightGray);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    border: 2px solid var(--yellow);
    background-color: var(--yellow);
  }

  ${({ checked }) =>
    checked &&
    `
    background-color: var(--yellow);
    border-color: var(--yellow);

    &:after {
      content: "\\2714";
      display: block;
      color: white;
      text-align: center;
      font-size: 12px;
      margin-top: -1px;
    }
  `}
`;

export default CheckBox;
