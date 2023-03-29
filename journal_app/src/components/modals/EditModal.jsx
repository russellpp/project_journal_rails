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
  EditModalContainer,
} from "./Modals";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { formatDateToYY } from "../../utils/UtilityFunctions";

function EditModal(props) {
  const { allCategories, task, setIsEditopen, setIsUpdating, setErrors } =
    props;
  const { editModel } = useFetch();
  const { getItem } = useLocalStorage();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [taskDetails, setTaskDetails] = useState({
    id: task.id,
    name: task.name,
    description: "",
    start_date: "",
    due_date: "",
    priority: "normal",
    task_status: "pending",
    category_id: "",
  });

  useEffect(() => {
    setIsOpen(true);

    setTaskDetails((prevState) => ({
      ...prevState,
      name: task.name,
      description: task.description,
      start_date: task.start_date,
      due_date: task.due_date,
      priority: "normal",
      task_status: "pending",
      category_id: task.category_id,
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    editModel(
      "task",
      getItem("user").token,
      taskDetails,
      setErrors,
      setIsUpdating,
      setIsEditopen
    );
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
    setIsEditopen(false);
  };

  return (
    <EditModalContainer className={isOpen ? "open" : ""}>
      <ModalHeader>Edit Task</ModalHeader>
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
              <Option value="" disabled>
                Select a category
              </Option>
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
            value={formatDateToYY(taskDetails.start_date)}
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
            value={formatDateToYY(taskDetails.due_date)}
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
    </EditModalContainer>
  );
}

export default EditModal;
