import React from "react";
import {
  ErrorModalContainer,
  ErrorModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modals";

function ErrorModal() {
  return (
    <ErrorModalContainer>
      <ErrorModalHeader>Error!</ErrorModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter></ModalFooter>
    </ErrorModalContainer>
  );
}

export default ErrorModal;
