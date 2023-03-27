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
    fetchAllTasks(token);
    console.log("fetch finsihed");
  };

  useEffect(() => {
    if (loggedIn) {
      getAll("tasks", token);
      getAll("categories", token);
    }
  }, [token]);

  return (
    <>
      <button onClick={handleSubmit}>Check Button</button>;
    </>
  );
}

export default Dashboard;
