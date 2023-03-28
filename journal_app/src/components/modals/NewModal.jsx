import React from "react";
import { Modal } from "@material-ui/core";
import styled from "styled-components";

function NewModal() {
  return <ModalContainer></ModalContainer>;
}

const ModalContainer = styled.div`
  transform: translateX(50%) translateY(-50%);
  height: 200px;
  width: 200px;
  background-color: var(--lightGray);
`;

export default NewModal;
