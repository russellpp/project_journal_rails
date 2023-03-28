import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Checkbox from "./buttons/CheckBox";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import { PriorityMark } from "./buttons/PriorityMark";
import {
  convertToDate,
  convertToHours,
  formatTimeLeft,
  getColorById,
} from "../utils/UtilityFunctions";
import { priorityColors } from "../utils/Constants";

function Task(props) {
  const { task, allCategories } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [priorityStatus, setPriorityStatus] = useState("normal");
  const [taskCategory, setTaskCategory] = useState("");

  useEffect(() => {
    setPriorityStatus(task.priority);
    setTaskCategory(allCategories.find((cat) => cat.id === task.category_id));
  }, []);

  const handleCheck = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <TaskContainer>
      <StartTime>{convertToHours(task.start_date)}</StartTime>
      <StartDate>{convertToDate(task.start_date)}</StartDate>
      <DueTime>{formatTimeLeft(task.due_date)}</DueTime>
      <DueDate>Due on {convertToDate(task.due_date)}</DueDate>
      <Name>{task.name}</Name>
      <Category color={getColorById(task.category_id)}>
        {taskCategory?.name}
      </Category>
      <Description>{task.description}</Description>
      <Priority>
        <PriorityMark color={priorityColors[priorityStatus]} />
      </Priority>
      <CheckBox>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </CheckBox>
      <Edit>
        <EditButton />
      </Edit>
      <Delete>
        <DeleteButton />
      </Delete>
    </TaskContainer>
  );
}

const TaskContainer = styled.div`
  margin: 10px 15px;
  font-size: 14px;
  color: white;
  display: grid;
  justify-items: center;
  grid-template-columns: 10% 7% 15% 35% 15% 8% 5% 5%;
  grid-template-areas:
    "time1 prio name desc time2 check edit delete"
    "date1 prio category desc date2 check edit delete";
`;

const StartTime = styled.span`
  font-size: 13px;
  font-weight: bolder;
  grid-area: time1;
`;

const StartDate = styled.span`
  font-size: 10px;
  grid-area: date1;
`;
const DueTime = styled.span`
  font-size: 13px;
  font-weight: bolder;
  grid-area: time2;
`;

const DueDate = styled.span`
  font-size: 10px;
  grid-area: date2;
`;

const Name = styled.span`
  grid-area: name;
  font-weight: 800;
  text-transform: uppercase;
`;
const Category = styled.span`
  grid-area: category;
  text-transform: uppercase;
  color: ${({ color }) => color};
  font-size: 10px;
`;

const Description = styled.span`
  grid-area: desc;
  font-weight: 100;
  font-size: 12px;
  justify-self: flex-start;
  margin: auto;
  margin-left: 20px;
`;

const Priority = styled.div`
  grid-area: prio;
`;

const CheckBox = styled.div`
  grid-area: check;
  margin: auto auto;
`;
const Edit = styled.div`
  grid-area: edit;
  margin: auto auto;
`;
const Delete = styled.div`
  grid-area: delete;
  margin: auto auto;
`;

export default Task;
