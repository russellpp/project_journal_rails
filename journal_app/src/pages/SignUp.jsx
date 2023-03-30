import React from "react";
import { useState } from "react";
import { Navigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import styled from "styled-components";

const FormContainer = styled.div`
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

const FormTitle = styled.label`
  font-size: 35px;
  color: var(--lightGray);
  font-weight: 300;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInput = styled.input`
  height: 32px;
  width: 300px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
`;

const FormSubmitButton = styled.input`
  height: 32px;
  width: 300px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 4px;
  border: none;
  background-color: var(--yellow);
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue);
  }
`;

const FormExtraText = styled.p`
  margin-top: 100px;
  font-size: 16px;

  a {
    color: #0077ff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

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

function SignUp(props) {
  const { loggedIn, errors, setErrors } = props;
  const { signUp } = useFetch();

  const [state, setState] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    displayError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    signUp(state, setState, setErrors);
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
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormTitle>Sign Up</FormTitle>
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
          <FormInput
            type="password"
            name="password_confirmation"
            value={state.password_confirmation}
            onChange={(e) =>
              setState({ ...state, password_confirmation: e.target.value })
            }
            placeholder="Confirm Password"
          />
          <FormSubmitButton type="submit" value="Sign Up" />
          <FormExtraText>
            Already have an account? <a href="/login">Login</a>
          </FormExtraText>
        </Form>
        {loggedIn ? <Navigate to="/dashboard" /> : null}
        {state.displayError ? (
          <ErrorMessage>{state.displayError}</ErrorMessage>
        ) : null}
      </FormContainer>
    </PageWrapper>
  );
}

export default SignUp;
