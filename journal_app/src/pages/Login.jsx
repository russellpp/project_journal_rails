import React from "react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router";
import { useFetch } from "../hooks/useFetch";

function Login(props) {
  const { loggedIn, updateLogin } = props;
  const navigate = useNavigate();
  const { logIn } = useFetch();

  const [state, setState] = useState({
    username: "",
    password: "",
    displayError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(state, setState, updateLogin);
  };

  return (
    <>
      <div id="login-form-container">
        <form id="login-form" onSubmit={handleSubmit}>
          <label className="form-title">Login</label>
          <br />
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
            placeholder="Username"
          />
          <br />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            placeholder="Password"
          />
          <br />
          <input type="submit" value="Login" />
          <br />
          <br />
          <p className="form-extra-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
        {loggedIn ? <Navigate to="/dashboard" /> : null}
        {state.displayError ? (
          <p className="error-message">{state.displayError}</p>
        ) : null}
      </div>
    </>
  );
}

export default Login;
