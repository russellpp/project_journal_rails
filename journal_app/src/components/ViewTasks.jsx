import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./buttons/AddButton";
import SortButton from "./buttons/SortButton";
import { useState, useEffect } from "react";
import NewModal from "./modals/NewModal";

function ViewTasks(props) {
  const { allTasks, allCategories } = props;
  const [openModals, setOpenModals] = useState({
    new: false,
    sort: false,
    edit: false,
    delete: false,
  });

  const handleOpen = () => {
    console.log("setting modal");
    setOpenModals({
      new: true,
      sort: false,
      edit: false,
      delete: false,
    });
  };

  return (
    <ViewWrapper>
      <ViewOptions>
        <SortButton />
        <AddButton handleOpen={handleOpen} />
        {openModals?.new && NewModal}
      </ViewOptions>
      <ListWrapper>
        <List>
          {allTasks?.map((task, index) => {
            return (
              <Task task={task} key={index} allCategories={allCategories} />
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
