import React, { useState } from "react";
import { useEffect } from "react";
import {
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
} from "./Modals";

function NewModal(props) {
  const { allCategories, openModals, setOpenModals } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("");
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    description: "",
    start_date: "",
    due_date: "",
    priority: "normal",
    task_status: "pending",
    category_id: "",
  });

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleSubmit = (e) => {
    console.log(taskDetails);
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedIndex = e.target.value;
    setSelectedOptionIndex(selectedIndex);
    setTaskDetails((prevState) => ({
      ...prevState,
      category_id: allCategories[selectedIndex].id,
    }));
  };
  const handleClose = () => {
    setIsOpen(false);
    setOpenModals((prevState) => ({
      ...prevState,
      new: !prevState.new,
      sort: false,
      edit: false,
      delete: false,
    }));
  };

  return (
    <ModalContainer className={isOpen ? "open" : ""}>
      <ModalHeader>New Task</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <FormLabel>Name:</FormLabel>
          <FormInput
            type="text"
            value={taskDetails.name}
            onChange={(e) =>
              setTaskDetails((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
            required
          />
          <FormLabel>Description:</FormLabel>
          <FormInput
            type="text"
            value={taskDetails.description}
            onChange={(e) =>
              setTaskDetails((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
            required
          />
          <SelectContainer>
            <FormLabel>Category</FormLabel>
            <Select value={selectedOptionIndex} onChange={handleSelectChange}>
              <Option value="">Select an option</Option>
              {allCategories.map((cat, index) => (
                <Option key={index} value={index}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </SelectContainer>
          <FormLabel>Starts on:</FormLabel>
          <FormInput
            type="datetime-local"
            value={taskDetails.start_date}
            onChange={(e) =>
              setTaskDetails((prevState) => ({
                ...prevState,
                start_date: e.target.value,
              }))
            }
            required
          />
          <FormLabel>Due date:</FormLabel>
          <FormInput
            type="datetime-local"
            min={taskDetails.start_date}
            value={taskDetails.due_date}
            onChange={(e) =>
              setTaskDetails((prevState) => ({
                ...prevState,
                due_date: e.target.value,
              }))
            }
            required
          />
          <RadioContainer>
            <FormLabel>Priority:</FormLabel>
            <FormInput
              type="radio"
              id="low"
              name="priority"
              value="low"
              checked={taskDetails.priority === "low"}
              onChange={() =>
                setTaskDetails((prevState) => ({
                  ...prevState,
                  priority: "low",
                }))
              }
            />
            <FormLabel htmlFor="low">Low</FormLabel>

            <FormInput
              type="radio"
              id="low"
              name="priority"
              value="normal"
              checked={taskDetails.priority === "normal"}
              onChange={() =>
                setTaskDetails((prevState) => ({
                  ...prevState,
                  priority: "normal",
                }))
              }
            />
            <FormLabel htmlFor="normal">normal</FormLabel>

            <FormInput
              type="radio"
              id="low"
              name="priority"
              value="high"
              checked={taskDetails.priority === "high"}
              onChange={() =>
                setTaskDetails((prevState) => ({
                  ...prevState,
                  priority: "high",
                }))
              }
            />
            <FormLabel htmlFor="high">high</FormLabel>
          </RadioContainer>
        </ModalBody>
        <ModalFooter>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
          <CancelButton onClick={handleClose}>Cancel</CancelButton>
        </ModalFooter>
      </form>
    </ModalContainer>
  );
}

export default NewModal;
