import React from "react";
import { Navigate } from "react-router";

function Logout(props) {
  const { clearUser, loggedIn } = props;

  return (
    <>
      {clearUser()}
    </>
  );
}

export default Logout;
