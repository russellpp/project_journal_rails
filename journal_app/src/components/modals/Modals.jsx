import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 200px;
  height: auto;
  width: 400px;
  background-color: var(--lighterGray);
  box-shadow: 0 0 0 20000px #00000076;
  opacity: 0.2;
  transition: opacity 0.15s ease-in-out;

  &.open {
    opacity: 1;
  }
`;

const ErrorModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 100px;
  height: auto;
  width: 250px;
  background-color: var(--lighterGray);
  box-shadow: 0 0 0 20000px #00000076;
  opacity: 0.2;
  transition: opacity 0.15s ease-in-out;

  &.open {
    opacity: 1;
  }
`;

const ModalHeader = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
  font-weight: bold;
  background-color: var(--yellow);
  color: white;
`;

const ErrorModalHeader = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
  font-weight: bold;
  background-color: var(--burgundy);
  color: white;
`;

const ModalBody = styled.div`
  padding: 15px;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 15px;
`;

const SubmitButton = styled.button`
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  padding: 3px 10px;
  background: linear-gradient(
    to right,
    var(--lightGray) 50%,
    var(--yellow) 50%
  );
  background-size: 200% 100%;
  background-position: left center;
  color: var(--darkGray);
  transition: border 0.5s ease-in-out;
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;

    border: 1px solid var(--yellow);
    background-position: right center;
    color: white;
    background-image: linear-gradient(
        to right,
        var(--lightGray) 50%,
        var(--yellow) 50%
      ),
      linear-gradient(to right, #fff 50%, #fff 50%);
  }
`;

const CancelButton = styled.button`
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  padding: 3px 10px;
  background: linear-gradient(
    to right,
    var(--lightGray) 50%,
    var(--burgundy) 50%
  );
  background-size: 200% 100%;
  background-position: left center;
  color: var(--darkGray);
  transition: border 0.25s ease-in-out;
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;

    border: 1px solid var(--burgundy);
    background-position: right center;
    color: white;
    background-image: linear-gradient(
        to right,
        var(--lightGray) 50%,
        var(--burgundy) 50%
      ),
      linear-gradient(to right, #fff 50%, #fff 50%);
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid gray;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Option = styled.option`
  font-size: 1rem;
`;

const FormLabel = styled.label``;

const FormInput = styled.input``;

const RadioContainer = styled.div``;
export {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  FormInput,
  FormLabel,
  Option,
  Select,
  SelectContainer,
  SubmitButton,
  CancelButton,
  RadioContainer,
  ErrorModalContainer,
  ErrorModalHeader,
};