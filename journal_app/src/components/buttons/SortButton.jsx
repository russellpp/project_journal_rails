import React from "react";
import { Sort } from "@material-ui/icons";
import styled from "styled-components";

function SortButton(props) {
  const { handleSortOrderToggle } = props;

  return (
    <Button onClick={handleSortOrderToggle}>
      <SortIcon />
    </Button>
  );
}

const Button = styled.button`
  background-color: var(--darkGray);
  border: none;
  border-radius: 4px;
  color: var(--yellow);
  cursor: pointer;
  height: 50px;
  max-width: 50px;
  text-transform: uppercase;
  transition: all 0.1s ease-in-out;
  
  &:hover {
    background-color: var(--gray);
    color: var(--blue);
  }
`;
const SortIcon = styled(Sort)`
  font-size: 35px !important;
`;

export default SortButton;
