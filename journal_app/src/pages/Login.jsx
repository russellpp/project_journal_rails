import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";

function Login(props) {
  const { loggedIn, updateLogin, errors, setErrors } = props;
  const navigate = useNavigate();
  const { logIn } = useFetch();

  const [state, setState] = useState({
    username: "",
    password: "",
    displayError: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (state.loggedIn) {
      getAll("tasks", user.token, setIsUpdating);
      getAll("categories", user.token), setIsUpdating;
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(state, setState, updateLogin, setErrors);
  };

  return (
    <PageWrapper>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#753b9b"
          fillOpacity="1"
          d="M0,160L60,133.3C120,107,240,53,360,37.3C480,21,600,43,720,85.3C840,128,960,192,1080,192C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#9A013A"
          fillOpacity="0.8"
          d="M 0 224 C 163 149 204 87 322 118 C 509 176 535 211 642 213 C 744 199 764 174 859 126 C 998 45 1159 53 1360 192 L 1440 246 L 1440 320 L 1380 320 C 1320 320 1200 320 1080 320 C 960 320 840 320 720 320 C 600 320 480 320 360 320 C 240 320 120 320 60 320 L 0 320 Z"
        ></path>
      </ClipSvg>
      <ClipSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#b5b82f"
          fillOpacity="0.7"
          d="M0,64L48,101.3C96,139,192,213,288,218.7C384,224,480,160,576,149.3C672,139,768,181,864,218.7C960,256,1056,288,1152,288C1248,288,1344,256,1392,240L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </ClipSvg>
      <LoginContainer>
        <LoginForm onSubmit={handleSubmit}>
          <FormTitle>Sign In</FormTitle>
          <FormInput
            type="text"
            name="username"
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
            placeholder="Username"
          />
          <FormInput
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            placeholder="Password"
          />
          <FormSubmitButton type="submit" value="Login" />
          <FormExtraText>
            Don't have an account? <a href="/signup">Register</a>
          </FormExtraText>
          {loggedIn ? <Navigate to="/dashboard" /> : null}
          {state.displayError ? (
            <ErrorMessage>{state.displayError}</ErrorMessage>
          ) : null}
        </LoginForm>
      </LoginContainer>
    </PageWrapper>
  );
}
const PageWrapper = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  height: 100vh;
  width: 100vw;
  background-color: #15355f;
  z-index: 4;
`;

const ClipSvg = styled.svg`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0%;
  min-width: 100vw;
  min-height: 400px;
`;
const LoginContainer = styled.div`
  position: absolute;
  transform: translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
  width: 300px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  box-sizing: content-box;
  padding: 50px;
  border-radius: 10px;
  background-color: none;
  box-shadow: 0 0 0 20000px #00000076;
  height: 400px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
`;

const FormTitle = styled.label`
  font-size: 35px;
  font-weight: 300;
  color: var(--lightGray);
  background-color: transparent;
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  height: 32px;
  width: 300px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-size: 16px;
  outline: none;
`;

const FormSubmitButton = styled.input`
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 15px;
  text-transform: uppercase;
  width: 200px;
  border: none;
  border-radius: 5px;
  background-color: var(--yellow);
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: var(--burgundy);
  }
`;
const FormExtraText = styled.p`
  color: var(--lightGray);
  margin-top: 140px;
  > a {
    color: var(--lightGray);
    & :hover {
      color: var() (--burgundy);
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default Login;
