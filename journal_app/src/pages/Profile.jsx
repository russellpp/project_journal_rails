import React from "react";

function Profile(props) {
  const { username } = props;
  const user = localStorage.getItem("user");
  const token = JSON.parse(user).token;
  const handleSubmit = () => {
    console.log(user);
    console.log(token);
    fetch("http://localhost:3000/api/v1/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Hello {username}</h1>
      <button onClick={handleSubmit}>Check Button</button>;
    </>
  );
}

export default Profile;
