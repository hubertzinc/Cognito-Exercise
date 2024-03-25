export interface IUser {
   id: string;
   sub: string;
   username: string;
   email: string;
   "cognito:username": string;
}