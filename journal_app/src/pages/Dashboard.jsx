import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import OptionsSlider from "../components/OptionsSlider";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ViewToday from "../components/ViewToday";
import ViewTasks from "../components/ViewTasks";
import ViewCategories from "../components/ViewCategories";
import ViewCategory from "../components/ViewCategory";
import ViewCalendar from "../components/ViewCalendar";

function Dashboard(props) {
  const {
    username,
    loggedIn,
    errors,
    setErrors,
    isUpdating,
    setIsUpdating,
    allTasks,
    setAllTasks,
    allCategories,
    setAllCategories,
  } = props;
  const navigate = useNavigate();
  const [view, setView] = useState("Today");
  const { getItem } = useLocalStorage();
  const { getAll } = useFetch();

  useEffect(() => {
    navigate(`/dashboard/${view.toLowerCase()}`);
  }, [view]);

  const updateUp = () => {
    console.log("isupdating");
    setIsUpdating(true);
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Hello {username}</h1>
        <button onClick={updateUp}></button>
        <ViewType>
          <OptionsSlider view={view} setView={setView} />
        </ViewType>
      </Header>
      <Body>
        <Routes>
          <Route path="/today" element={<ViewToday />} />
          <Route
            path="/tasks"
            element={
              <ViewTasks
                allTasks={allTasks}
                allCategories={allCategories}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                setErrors={setErrors}
              />
            }
          />
          <Route path="/categories" element={<ViewCategories />} />
          <Route path="/category" element={<ViewCategory />} />
          <Route path="/calendar" element={<ViewCalendar />} />
          <Route path="/*" element={<Navigate to="/dashboard/today" />} />
        </Routes>
      </Body>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: var(--black);
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  height: 85%;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto 30px;
  border-radius: 20px;
  background-color: var(--darkGray);
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 15%;
  width: 90%;
  margin: 0 auto;
  max-width: 1000px;
  color: var(--white);
  display: flex;
  flex-direction: column;
`;
const ViewType = styled.div`
  border: 1px white;
  overflow-x: visible;
`;

export default Dashboard;
