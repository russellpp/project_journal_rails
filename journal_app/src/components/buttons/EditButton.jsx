import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

function EditButton(props) {
  const { setIsEditopen } = props;
  const handleOpen = () => {
    console.log("opening edit");
    setIsEditopen(true)
  };
  return (
    <Button onClick={handleOpen}>
      <StyledEditIcon />
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
  transition: all 0.2s ease;

  &:hover {
    color: var(--lighterGray);
  }
`;

const StyledEditIcon = withStyles({
  root: {
    fontSize: "17px",
  },
})(EditIcon);

export default EditButton;
