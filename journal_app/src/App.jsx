import { useEffect, useReducer, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState()
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
    if (user) {
      console.log("setting user state");
      dispatch({
        type: "LOGIN",
        payload: {
          username: user.username,
        },
      });
      setToken(user?.token)
      navigate("/dashboard");
    }
  }, []);

  const clearUser = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login loggedIn={state.loggedIn} />} />
        <Route
          path="/logout"
          element={<Logout loggedIn={state.loggedIn} clearUser={clearUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard username={state.username} loggedIn={state.loggedIn} token={token} />
          }
        />
        <Route path="/signup" element={<SignUp loggedIn={state.loggedIn} />} />
        <Route path="/" element={<SignUp loggedIn={state.loggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
