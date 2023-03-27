import { useLocalStorage } from "./useLocalStorage";
import { useUser } from "./useUser";
import { HOST_URL } from "../utils/Constants";
import { useMemo } from "react";

export const useFetch = () => {
  const { getItem, setItem } = useLocalStorage();

  const getAll = async (model, token) => {
    const PATH_KEY = model === "tasks" ? "tasks" : "categories";
    try {
      console.log(token);
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

  return { getAll };
};
