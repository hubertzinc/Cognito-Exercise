export interface IAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
  expiryDate: string;
  roles: string[];
}
