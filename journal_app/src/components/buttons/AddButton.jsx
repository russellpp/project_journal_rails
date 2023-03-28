import { Add } from "@material-ui/icons";
import styled from "styled-components";
import React from "react";

function AddButton(props) {
  const { openModals, setOpenModals } = props;

  const handleOpen = () => {
    console.log("hello");
    setOpenModals((prevState) => ({
      ...prevState,
      new: !prevState.new,
      sort: false,
      edit: false,
      delete: false,
    }));
  };

  return (
    <Button onClick={handleOpen}>
      <AddIcon />
    </Button>
  );
}

const Button = styled.button`
  background-color: var(--yellow);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  height: 48px;
  padding: 0;
  width: 48px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: var(--blue);
    transform: scale(1.1);
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
  }
`;

const AddIcon = styled(Add)`
  font-size: 45px;
`;

export default AddButton;
export { Button };
