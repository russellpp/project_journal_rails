import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const CheckBox = (props) => {
  const { task, setIsUpdating, setErrors } = props;
  const { getItem } = useLocalStorage();
  const { editModel } = useFetch();
  const [checked, setChecked] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: task.name,
    description: task.description,
    start_date: task.start_date,
    due_date: task.due_date,
    priority: task.priority,
    task_status: task.task_status,
    category_id: task.category_id,
    id: task.id,
  });

  useEffect(() => {
    editModel(
      "task",
      getItem("user").token,
      taskDetails,
      setErrors,
      setIsUpdating
    );
  }, [taskDetails]);

  useEffect(() => {
    if (task.task_status === "completed") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  const handleCheckboxClick = () => {
    setChecked(!checked);
    setTaskDetails((prevState) => ({
      ...prevState,
      name: task.name,
      description: task.description,
      start_date: task.start_date,
      due_date: task.due_date,
      priority: "normal",
      task_status: checked ? "pending" : "completed",
      category_id: task.category_id,
    }));
  };

  return <CircleCheckbox checked={checked} onClick={handleCheckboxClick} />;
};

const CircleCheckbox = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid var(--lightGray);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    border: 2px solid var(--yellow);
    background-color: var(--yellow);
  }

  ${({ checked }) =>
    checked &&
    `
    background-color: var(--yellow);
    border-color: var(--yellow);

    &:after {
      content: "\\2714";
      display: block;
      color: white;
      text-align: center;
      font-size: 12px;
      margin-top: -1px;
    }
  `}
`;

export default CheckBox;
