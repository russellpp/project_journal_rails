import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const [state, setState] = useState({
    username: "",
    loggedIn: false,
  });

  useEffect(() => {
    console.log("useEffect");
    stayLoggedIn();
  }, []);

  const stayLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("inside stayedlogged in");
    if (user) {
      console.log("before set state");
      setState({
        username: user.username,
        loggedIn: true,
      });
      console.log("after set state");
    }
  };

  const updateUsername = (name) => {
    setState((prevState) => ({ ...prevState, username: name }));
  };

  const toggleLoggedIn = () => {
    setState((prevState) => ({ ...prevState, loggedIn: !state.loggedIn }));
  };

  const clearUser = () => {
    localStorage.clear();
    updateUsername("");
    toggleLoggedIn();
  };

  return (
    <>
      {state.loggedIn ? <Navigate to="/profile" /> : null}

      <Routes>
        <Route
          path="/login"
          element={
            <Login
              updateUsername={updateUsername}
              toggleLoggedIn={toggleLoggedIn}
              loggedIn={state.loggedIn}
            />
          }
        />
        <Route
          path="/logout"
          element={<Logout loggedIn={state.loggedIn} clearUser={clearUser} />}
        />
        <Route
          path="/profile"
          element={
            <Profile username={state.username} loggedIn={state.loggedIn} />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              updateUsername={updateUsername}
              toggleLoggedIn={toggleLoggedIn}
              loggedIn={state.loggedIn}
            />
          }
        />
        <Route
          path="/"
          element={
            <SignUp
              updateUsername={updateUsername}
              toggleLoggedIn={toggleLoggedIn}
              loggedIn={state.loggedIn}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
