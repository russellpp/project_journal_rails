import React, { useState } from "react";
import styled from "styled-components";
import Task from "./Task";
import EditButton from "./buttons/EditButton";
import DeleteButton from "./buttons/DeleteButton";
import { getColorById } from "../utils/UtilityFunctions";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import AddButton from "./buttons/AddButton";
import NewModal from "./modals/NewModal";

function Category(props) {
  const {
    category,
    allTasks,
    setErrors,
    allCategories,
    setIsUpdating,
    isUpdating,
  } = props;
  const [isInCategory, setIsIncCategory] = useState(true);
  const [isTaskInCategory, setIsTaskIncCategory] = useState(true);
  const arr = allTasks.filter((task) => task.category_id === category.id);
  const [isEditOpen, setIsEditopen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [openModals, setOpenModals] = useState({
    new: false,
    sort: false,
    edit: false,
    delete: false,
  });
  return (
    <CategoryContainer bcolor={getColorById(category.id)}>
      {openModals.new && (
        <NewModal
          openModals={openModals}
          setOpenModals={setOpenModals}
          allCategories={allCategories}
          setErrors={setErrors}
          setIsUpdating={setIsUpdating}
          category={category}
          isTaskInCategory={isTaskInCategory}
        />
      )}
      {isEditOpen && (
        <EditModal
          allCategories={allCategories}
          setErrors={setErrors}
          setIsUpdating={setIsUpdating}
          category={category}
          setIsEditopen={setIsEditopen}
          isInCategory={isInCategory}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          allCategories={allCategories}
          setErrors={setErrors}
          setIsUpdating={setIsUpdating}
          category={category}
          setIsDeleteOpen={setIsDeleteOpen}
          isInCategory={isInCategory}
        />
      )}
      <CategoryHeader>
        <CategoryDetails>
          <h1>{category.name}</h1>
          <EditButton
            isEditOpen={isEditOpen}
            setIsEditopen={setIsEditopen}
            category={category}
          />
          <DeleteButton
            category={category}
            isDeleteOpen={isDeleteOpen}
            setIsDeleteOpen={setIsDeleteOpen}
          />
          <AddButton openModals={openModals} setOpenModals={setOpenModals} />
        </CategoryDetails>
        <h3>{category.description}</h3>
      </CategoryHeader>
      <TasksWrapper>
        {arr?.map((task, index) => {
          return (
            <Task
              key={index}
              task={task}
              setErrors={setErrors}
              allCategories={allCategories}
              setIsUpdating={setIsUpdating}
              isUpdating={isUpdating}
              isInCategory={isInCategory}
            />
          );
        })}
      </TasksWrapper>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border: 5px solid;
  background-color: ${({ bcolor }) => bcolor};
  border-radius: 20px;
  border-color: ${({ bcolor }) => bcolor};
`;
const CategoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  > h3 {
    color: var(--lightGray);
    text-transform: lowercase;
    margin-left: 5px;
  }
  margin-bottom: 10px;
`;
const CategoryDetails = styled.div`
  display: grid;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 2px;
  grid-template-columns: 80% 5% 5% 10%;
  justify-items: flex-end;
  > h1 {
    text-transform: uppercase;
    color: var(--darkGray);
    justify-self: left;
  }
`;

const TasksWrapper = styled.div``;

export default Category;
