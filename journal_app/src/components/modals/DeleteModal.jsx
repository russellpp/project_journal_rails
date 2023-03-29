import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  CancelButton,
  ErrorModalContainer,
  ErrorModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modals";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useFetch } from "../../hooks/useFetch";

function DeleteModal(props) {
  const { setIsDeleteOpen, task, setIsUpdating, setErrors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { getItem } = useLocalStorage();
  const { deleteModel } = useFetch();
  const [item, setItem] = useState("");

  useEffect(() => {
    setIsOpen(true);
    setItem(task);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setIsDeleteOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const token = getItem("user").token;
    deleteModel("task", token, task, setErrors, setIsUpdating, setIsDeleteOpen);
  };

  return (
    <ErrorModalContainer className={isOpen ? "open" : ""}>
      <ErrorModalHeader>Delete Task</ErrorModalHeader>
      <ModalBody>
        <p>{`Are you sure you want to delete ${item.name}`}</p>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={handleDelete}>DELETE</CancelButton>
        <CancelButton onClick={handleClose}>CANCEL</CancelButton>
      </ModalFooter>
    </ErrorModalContainer>
  );
}

const ErrorMessage = styled.div`
  color: white;
  margin-bottom: 10px;

  > p {
    text-transform: capitalize;
    color: var(--burgundy);
    font-weight: bold;
  }

  > ul {
    color: var(--gray);

    > li {
    }
  }
`;

export default DeleteModal;
