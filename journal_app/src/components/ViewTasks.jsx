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
        <SortButton />
        <AddButton openModals={openModals} setOpenModals={setOpenModals} />
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 15%;
  margin-bottom: 10px;
  > h1 {
    color: var(--yellow);
    text-align: center;
    padding-top: 5px;
    padding-left: 10px;
    font-size: 40px;
  }
`;
const List = styled.div`
  height: 100%;
  max-height: 650px;
`;

const ListWrapper = styled.div`
  overflow-y: auto;
  height: 650px; /* set a custom height */
  scrollbar-width: none;
  -ms-overflow-style: none; /* for Internet Explorer and Edge */
  /* hide the default scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }

  /* add a custom scrollbar */
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
