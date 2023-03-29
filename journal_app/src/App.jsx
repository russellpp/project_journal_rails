import { useEffect, useReducer, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { useFetch } from "./hooks/useFetch";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import ErrorModal from "./components/modals/ErrorModal";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const { getAll } = useFetch();
  const [token, setToken] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [errors, setErrors] = useState({
    status: false,
    error_msg: [],
  });
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
    if (state.loggedIn) {
      getAll("tasks", user.token, setIsUpdating);
      getAll("categories", user.token), setIsUpdating;
      setToken(user.token);
      navigate("/dashboard");
    }
  }, [state]);

  useEffect(() => {
    const fetchData = async () => {
      if (isUpdating) {
        const token = getItem("user").token;
        console.log("isupdating");
        await getAll("tasks", token);
        await getAll("categories", token);
        setAllTasks(getItem("tasks"));
        setAllCategories(getItem("categories"));
        setIsUpdating(false);
      }
    };
    fetchData();
  }, [isUpdating]);

  const updateLogin = (name, token) => {
    dispatch({
      type: "LOGIN",
      payload: {
        username: name,
      },
    });
    setToken(token);
  };

  const clearUser = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      {errors.status && <ErrorModal setErrors={setErrors} errors={errors} />}
      <Routes>
        <Route
          path="/login"
          element={
            <Login loggedIn={state.loggedIn} updateLogin={updateLogin} />
          }
        />
        <Route
          path="/logout"
          element={<Logout loggedIn={state.loggedIn} clearUser={clearUser} />}
        />
        <Route
          path="/dashboard/*"
          element={
            <Dashboard
              errors={errors}
              setErrors={setErrors}
              allCategories={allCategories}
              setAllCategories={setAllCategories}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
              username={state.username}
              loggedIn={state.loggedIn}
              token={token}
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
            />
          }
        />
        <Route path="/signup" element={<SignUp loggedIn={state.loggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
