import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";
import OptionsSlider from "../components/OptionsSlider";

function Dashboard(props) {
  const { username, token, loggedIn } = props;
  const { getItem } = useLocalStorage();
  const { getAll } = useFetch();
  const handleSubmit = () => {
    console.log("fetching");
    console.log("fetch finsihed");
  };



  return (
    <PageWrapper>
      <Header>
        <h1>Hello {username}</h1>
        <ViewType>
          <OptionsSlider />
        </ViewType>
      </Header>
      <Body></Body>
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
  height: 85%;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto 30px;
  border-radius: 20px;
  background-color: var(--darkGray);
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
`;

export default Dashboard;
