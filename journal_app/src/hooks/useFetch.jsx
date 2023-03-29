import { useLocalStorage } from "./useLocalStorage";
import { HOST_URL } from "../utils/Constants";
import { useNavigate, Navigate } from "react-router";

export const useFetch = () => {
  const { getItem, setItem } = useLocalStorage();
  const navigate = useNavigate();

  const logIn = async (state, setState, updateLogin) => {
    try {
      const response = await fetch(`${HOST_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: state?.username,
            password: state?.password,
          },
        }),
      });
      const data = await response.json();
      localStorage.clear();
      const userInfo = {
        id: data.user.id,
        username: data.user.username,
        token: data.jwt,
      };
      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("logged_in", true);
      updateLogin(userInfo?.username, userInfo?.token);
      navigate("/dashboard");
    } catch (error) {
      setState({ displayError: data.error });
    }
  };

  const getAll = async (model, token) => {
    const PATH_KEY = model === "tasks" ? "tasks" : "categories";
    console.log(`getting ${model}`);
    try {
      const response = await fetch(`${HOST_URL}/api/v1/${PATH_KEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setItem(model, data);
    } catch (error) {
      console.log(error);
    }
  };

  const createModel = async (
    model,
    token,
    post_details,
    setErrors,
    setIsUpdating,
    setOpenModals
  ) => {
    const PATH_KEY =
      model === "task"
        ? `categories/${post_details.category_id}/tasks`
        : "categories";
    console.log(`getting ${model}`);
    try {
      const response = await fetch(`${HOST_URL}/api/v1/${PATH_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post_details),
      });
      const data = await response.json();
      if (response.status === 422) {
        console.log("setting errors");
        setErrors({
          status: true,
          error_msg: data,
        });
      } else {
        console.log("setisupdating");
        setIsUpdating(true);
        setOpenModals((prevState) => ({
          ...prevState,
          new: !prevState.new,
          sort: false,
          edit: false,
          delete: false,
        }));
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const editModel = async (
    model,
    token,
    post_details,
    setErrors,
    setIsUpdating,
    setIsModalOpen
  ) => {
    const PATH_KEY =
      model === "task"
        ? `categories/${post_details.category_id}/tasks/${post_details.id}`
        : `categories/${post_details.id}`;
    console.log(`getting ${model}`);
    try {
      const response = await fetch(`${HOST_URL}/api/v1/${PATH_KEY}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post_details),
      });
      const data = await response.json();
      if (response.status === 422) {
        console.log("setting errors");
        setErrors({
          status: true,
          error_msg: data,
        });
      } else {
        console.log("setisupdating");
        setIsUpdating(true);
        setIsModalOpen(false);
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const deleteModel = async (
    model,
    token,
    post_details,
    setErrors,
    setIsUpdating,
    setIsModalOpen
  ) => {
    const PATH_KEY =
      model === "task"
        ? `categories/${post_details.category_id}/tasks/${post_details.id}`
        : `categories/${post_details.id}`;
    console.log(`deleting ${model}`);
    console.log(token);
    try {
      const response = await fetch(`${HOST_URL}/api/v1/${PATH_KEY}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.headers.get("Content-Type"));
      const data = await response.json();
      console.log("item deleted");
      console.log("setisupdating");
      setIsUpdating(true);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      setErrors(error);
    }
  };

  return { getAll, logIn, createModel, editModel, deleteModel };
};
