import React from "react";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useFetch } from "../hooks/useFetch";

function Dashboard(props) {
  const { username, token, loggedIn } = props;
  const { getItem } = useLocalStorage();
  const { getAll } = useFetch();
  const handleSubmit = () => {
    console.log("fetching");
    console.log("fetch finsihed");
  };


  return (
    <>
      <button onClick={handleSubmit}>Check Button</button>;
    </>
  );
}

export default Dashboard;
