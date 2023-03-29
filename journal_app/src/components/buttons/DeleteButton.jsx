import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { withStyles } from "@material-ui/core";
import styled from "styled-components";

function DeleteButton(props) {
  const { setIsDeleteOpen } = props;
  const handleOpen = () => {
    console.log("opening delete");
    setIsDeleteOpen(true);
  };
  return (
    <Button onClick={handleOpen}>
      <StyledDeleteIcon />
    </Button>
  );
}

const Button = styled.div`
  color: var(--lightGray);
  border: none;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    color: var(--lighterGray);
  }
`;

const StyledDeleteIcon = withStyles({
  root: {
    fontSize: "17px",
  },
})(DeleteIcon);

export default DeleteButton;
