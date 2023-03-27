import React from "react";
import { useState } from "react";
import { useNavigate, Navigate } from "react-router";

function Login(props) {
  const { loggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: "",
    displayError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: state.username,
          password: state.password,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.jwt) {
          setState({ displayError: data.error });
        } else {
          console.log(data);
          localStorage.clear();
          const userInfo = {
            id: data.user.id,
            username: data.user.username,
            token: data.jwt,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));
          localStorage.setItem("logged_in", true);
          navigate("/dashboard");
        }
      });
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
