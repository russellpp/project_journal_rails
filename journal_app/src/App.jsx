import { useEffect, useReducer, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { useFetch } from "./hooks/useFetch";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const { getAll } = useFetch();
  const [token, setToken] = useState(null);
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "LOGIN":
          return {
            username: action.payload.username,
            loggedIn: true,
          };
        case "LOGOUT":
          return {
            username: "",
            loggedIn: false,
          };
        default:
          return state;
      }
    },
    {
      username: "",
      loggedIn: false,
    }
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (state.loggedIn) {
      getAll("tasks", user.token);
      getAll("categories", user.token);
      navigate("/dashboard");
      console.log(state);
    }
  }, [state]);

  const updateLogin = (name, token) => {
    dispatch({
      type: "LOGIN",
      payload: {
        username: name,
      },
    });
    setToken(token);
  };

  const clearUser = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <Login loggedIn={state.loggedIn} updateLogin={updateLogin} />
          }
        />
        <Route
          path="/logout"
          element={<Logout loggedIn={state.loggedIn} clearUser={clearUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              username={state.username}
              loggedIn={state.loggedIn}
              token={token}
            />
          }
        />
        <Route path="/signup" element={<SignUp loggedIn={state.loggedIn} />} />
        <Route path="/" element={<SignUp loggedIn={state.loggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
