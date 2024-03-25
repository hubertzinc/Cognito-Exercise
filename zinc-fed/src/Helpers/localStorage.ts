import { IAuthUser } from "../Types/IAuthUser";

export const storeUser = (response: any) => {
  const user: unknown = {
    id: response.user.id,
    email: response.user.email,
    firstName: response.user.firstName,
    lastName: response.user.lastName,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiryDate: response.expiryDate,
    roles: response.user.roles
  };

  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): IAuthUser | null => {
  const userStr = localStorage.getItem("user");

  if (!userStr) {
    return null;
  }

  const user = JSON.parse(userStr);

  if (!user) {
    throw new Error("No current user");
  }

  return user;
};
