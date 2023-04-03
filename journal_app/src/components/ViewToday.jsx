import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { priorityColors } from "../utils/Constants";
import moment from "moment/moment";

function ViewToday(props) {
  const { allTasks, allCategories, setIsUpdating } = props;
  useEffect(() => {
    setIsUpdating(true);
  }, []);

  const today = new Date().toISOString().slice(0, 10);

  const tasksDueToday = allTasks
    .filter((task) => task.due_date.slice(0, 10) === today)
    .map((task) => ({
      ...task,
      position: "right",
      time: moment(task.due_date).format("HH:mm"),
    }));

  const tasksStartToday = allTasks
    .filter((task) => task.start_date.slice(0, 10) === today)
    .map((task) => ({
      ...task,
      position: task.due_date.slice(0, 10) === today ? "left" : "right",
      time: moment(task.start_date).format("HH:mm"),
    }));

  const sortedTasks = [...tasksDueToday, ...tasksStartToday].sort(
    (a, b) => moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
  );

  const handleClick = () => {
    console.log(tasksDueToday);
  };

  return (
    <Container>
      {allTasks.length === 0 && allCategories.length === 0 && (
        <EmptyArrayView>
          <h1>Add a category</h1>
        </EmptyArrayView>
      )}
      {allTasks.length === 0 && allCategories.length !== 0 && (
        <EmptyArrayView>
          <h1>Add a task</h1>
        </EmptyArrayView>
      )}
      {allTasks.length !== 0 &&
        allCategories.length !== 0 &&
        sortedTasks.length === 0 && (
          <EmptyArrayView>
            <h1>No tasks for today</h1>
          </EmptyArrayView>
        )}
      {allTasks.length !== 0 &&
        allCategories.length !== 0 &&
        sortedTasks.length !== 0 && (
          <VerticalTimeline>
            {sortedTasks?.map((task, index) => {
              return (
                <StyledVerticalElement
                  key={index}
                  position={task.position}
                  className="vertical-timeline-element--work"
                  contentStyle={
                    task.position === "left"
                      ? { background: "var(--yellow)", color: "#fff" }
                      : { background: "var(--burgundy)", color: "#fff" }
                  }
                  contentArrowStyle={
                    task.position === "left"
                      ? {
                          borderRight: "7px solid  var(--yellow)",
                        }
                      : {
                          borderRight: "7px solid  var(--burgundy)",
                        }
                  }
                  date={
                    task.position === "left"
                      ? `Starts on ${task.time}`
                      : `Due on ${task.time}`
                  }
                  iconStyle={
                    task.position === "left"
                      ? { background: "var(--yellow)", color: "#fff" }
                      : { background: "var(--burgundy)", color: "#fff" }
                  }
                >
                  <TextContainer>
                    <h3 className="vertical-timeline-element-title">
                      {task.name}
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                      {
                        allCategories.find((cat) => cat.id === task.category_id)
                          .name
                      }
                    </h4>
                    <p>{task.description}</p>
                    <Priority color={priorityColors[task.priority]}>
                      <PriorityMark color={priorityColors[task.priority]} />
                      <p>{task?.priority} priority</p>
                    </Priority>
                  </TextContainer>
                </StyledVerticalElement>
              );
            })}
          </VerticalTimeline>
        )}
    </Container>
  );
}

const EmptyArrayView = styled.div`
  text-align: center;
  margin-top: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  > h1 {
    color: var(--lightGray);
    font-weight: 400;
    text-transform: uppercase;
    font-size: 50px;
    margin-right: 30px;
  }
`;

const StyledVerticalElement = styled(VerticalTimelineElement)``;

const TextContainer = styled.div`
  > h3 {
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  > p {
    color: black;
  }
`;

const Container = styled.div`
  max-height: 100%;
  overflow-y: auto;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }
`;

const Priority = styled.div`
  grid-area: prio;
  display: flex;
  flex-direction: row;
  justify-self: left;
  justify-items: center;
  align-items: center;
  color: ${({ color }) => color};
  > p {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bolder;
    text-align: center;
  }
`;

const PriorityMark = styled.div`
  position: relative;
  margin-top: 10px;
  margin-right: 10px;
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
  transform: rotate(45deg);
`;

export default ViewToday;

export { EmptyArrayView };
