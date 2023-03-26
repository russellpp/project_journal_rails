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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      stayLoggedIn(user);
    }
  }, [state]);

  const stayLoggedIn = (user) => {
    setState({
      username: user.username,
      loggedIn: true,
    });
  };
  const updateUsername = (username) => {
    setState({ username });
  };

  const toggleLoggedIn = () => {
    setState({ loggedIn: !state.loggedIn });
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
