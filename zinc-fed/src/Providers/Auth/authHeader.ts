import { getAccessToken } from "../../Helpers/localStorage";

export const authHeader = () => {
   const accessToken = getAccessToken();

   if (accessToken) {
      return { Authorization: "Bearer " + accessToken };
   }

   return { Authorization: "" };
};
