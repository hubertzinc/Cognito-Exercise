import { getUser } from "../../Helpers/localStorage";

export const authHeader = () => {
  const user = getUser();

  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  }

  return { Authorization: "" };
};
