import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  CancelButton,
  ErrorModalContainer,
  ErrorModalHeader,
  ModalBody,
  ModalFooter,
} from "./Modals";

function ErrorModal(props) {
  const { errors, setErrors } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState();

  useEffect(() => {
    setIsOpen(true);
    setMessage(Object.keys(errors.error_msg));
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setErrors({
      status: false,
      error_msg: [],
    });
  };

  return (
    <ErrorModalContainer className={isOpen ? "open" : ""}>
      <ErrorModalHeader>Error!</ErrorModalHeader>
      <ModalBody>
        {message?.map((key, value) => {
          return (
            <ErrorMessage key={key}>
              <p>{key.replace(/_/g, " ")}</p>
              <ul>
                {errors.error_msg[key].map((errorMsg, index) => (
                  <li key={index}>{errorMsg}</li>
                ))}
              </ul>
            </ErrorMessage>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={handleClose}>OK</CancelButton>
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

export default ErrorModal;
