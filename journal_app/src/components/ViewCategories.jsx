import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./buttons/AddButton";
import SortButton from "./buttons/SortButton";
import { useState, useEffect } from "react";
import NewModal from "./modals/NewModal";
import EditModal from "./modals/EditModal";
import { ViewWrapper, ViewOptions, ListWrapper, List } from "./ViewTasks";
import Category from "./Category";

function ViewCategories(props) {
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
  const [isCategory, setIsCategory] = useState(true);

  const handleClick = () => {
    console.log(allCategories);
  };

  return (
    <ViewWrapper>
      {openModals.new && (
        <NewModal
          openModals={openModals}
          setOpenModals={setOpenModals}
          allCategories={allCategories}
          setErrors={setErrors}
          setIsUpdating={setIsUpdating}
          isCategory={isCategory}
        />
      )}
      <ViewOptions>
        <h1></h1>
        <AddButton openModals={openModals} setOpenModals={setOpenModals} />
      </ViewOptions>
      <ListWrapper>
        <List>
          {allCategories?.map((cat, index) => {
            return (
              <Category
                category={cat}
                allTasks={allTasks}
                setErrors={setErrors}
                allCategories={allCategories}
                setIsUpdating={setIsUpdating}
                isUpdating={isUpdating}
              />
            );
          })}
        </List>
      </ListWrapper>
    </ViewWrapper>
  );
}

export default ViewCategories;
