import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./buttons/AddButton";
import SortButton from "./buttons/SortButton";
import { useState, useEffect } from "react";
import NewModal from "./modals/NewModal";
import EditModal from "./modals/EditModal";

function ViewTasks(props) {
  const {
    allTasks,
    allCategories,
    errors,
    setErrors,
    isUpdating,
    setIsUpdating,
  } = props;
  const [openModals, setOpenModals] = useState({
    new: false,
    sort: false,
    edit: false,
    delete: false,
  });

  useEffect(() => {
    setIsUpdating(true);
  }, []);

  return (
    <ViewWrapper>
      {openModals.new && (
        <NewModal
          openModals={openModals}
          setOpenModals={setOpenModals}
          allCategories={allCategories}
          setErrors={setErrors}
          setIsUpdating={setIsUpdating}
        />
      )}
      <ViewOptions>
        <p>Starts on</p>
        <span>Deadline</span>
        <h3>Priority</h3>
        <div>
          <AddButton openModals={openModals} setOpenModals={setOpenModals} />
        </div>
      </ViewOptions>
      <ListWrapper>
        <List>
          {allTasks?.map((task, index) => {
            return (
              <Task
                key={index}
                task={task}
                setErrors={setErrors}
                allCategories={allCategories}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
              />
            );
          })}
        </List>
        1
      </ListWrapper>
    </ViewWrapper>
  );
}

const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewOptions = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 10% 10% 25% 25% 12% 8% 5% 5%;
  grid-template-areas:
    "time1 prio name desc time2 edit edit delete"
    "date1 prio category desc date2 edit edit delete";
  width: 100%;
  height: 15%;
  margin-bottom: 10px;
  > h1 {
    grid-area: edit;
    color: var(--yellow);
    font-size: 15px;
  }
  > div {
    grid-area: delete;
  }
  > p {
    font-size: 15px;
    grid-area: date1;
    font-weight: 600;
    justify-self: right;
    color: var(--yellow);
  }
  > span {
    font-size: 15px;
    color: var(--yellow);
    grid-area: date2;
  }
  > h3 {
    font-size: 15px;
    color: var(--yellow);
    grid-area: prio;
    font-weight: 500;
    align-self: flex-end;
  }
  > button {
    grid-area: delete;
  }
`;

const Select = styled.select`
  font-size: 15pxrem;
  padding: 0.5rem;
  background-color: var(--darkGray);
  color: var(--yellow);
  border: 2px solid var(--yellow);
`;

const SelectContainer = styled.div`
  position: relative;
`;
const List = styled.div`
  height: 100%;
  max-height: 650px;
`;

const ListWrapper = styled.div`
  overflow-y: auto;
  height: 650px;
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

export default ViewTasks;
export { ViewWrapper, ViewOptions, ListWrapper, List };
