import React from "react";
import { Navigate } from "react-router";

function Logout(props) {
  const { clearUser, loggedIn } = props;

  return (
    <>
      {clearUser()}
      {loggedIn ? <Navigate to="/login" /> : null}
    </>
  );
}

export default Logout;
