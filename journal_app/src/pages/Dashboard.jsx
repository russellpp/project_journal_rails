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
import Clock from "../components/Clock";
import { ExitToApp } from "@material-ui/icons";

function Dashboard(props) {
  const {
    username,
    loggedIn,
    errors,
    clearUser,
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

  const handleLogOut = () => {
    clearUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <PageWrapper>
      <LogOut onClick={handleLogOut}>
        <ExitToApp style={{ fontSize: "37px" }} />
      </LogOut>
      <Header>
        <HeaderContainer>
          <h1>My Journal</h1>
          <Clock></Clock>
        </HeaderContainer>
        <ViewType>
          <OptionsSlider
            view={view}
            setView={setView}
            setIsUpdating={setIsUpdating}
          />
        </ViewType>
      </Header>
      <Body>
        <Routes>
          <Route
            path="/today"
            element={
              <ViewToday
                allTasks={allTasks}
                allCategories={allCategories}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                setErrors={setErrors}
              />
            }
          />
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
          <Route
            path="/categories"
            element={
              <ViewCategories
                allTasks={allTasks}
                allCategories={allCategories}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                setErrors={setErrors}
              />
            }
          />
          {/* <Route path="/*" element={<Navigate to="/dashboard/today" />} /> */}
        </Routes>
      </Body>
    </PageWrapper>
  );
}

const LogOut = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
  width: 70px;
  height: 70px;
  border: none;
  padding: 10px;
  border-radius: 50%;
  background-color: black;
  color: var(--yellow);
  transition: all 0.3s ease-in;

  & :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

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

const HeaderContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 1000px;
  > h1 {
    color: var(--lightGray);
  }
`;

const ViewType = styled.div`
  border: 1px white;
  margin-top: 15px;
  overflow-x: visible;
`;

export default Dashboard;
