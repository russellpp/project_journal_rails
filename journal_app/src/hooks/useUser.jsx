import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { getItem } = useLocalStorage();

  const user_details = getItem("user");

  return { user_details };
};
