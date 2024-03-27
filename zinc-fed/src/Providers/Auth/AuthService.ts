import { jwtDecode } from "jwt-decode";
import { IAuthResponse, IAuthSignUpResponse } from "../../Types/IAuthResponse";
import { IUser } from "../../Types/IUser";

export interface IAuthService {
   signIn(email: string, password: string): Promise<IUser>;
   signOut(): void;
   getUser(): IUser | null;
   isAuthenticated(): boolean;
}

export class AuthService implements IAuthService {
   private baseUrl: string = "https://cognito-idp.ap-southeast-2.amazonaws.com/";

   public signIn(email: string, password: string): Promise<IUser> {
      const payload = {
         "AuthParameters": {
            "USERNAME": email,
            "PASSWORD": password,
         },
         "AuthFlow": "USER_PASSWORD_AUTH",
         "ClientId": "55f5a6mpu0836rk8tk56uqdmt3"
      };

      const options = {
         method: "POST",
         body: JSON.stringify(payload),
         headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth"
         }
      };

      return fetch(this.baseUrl, options)
         .then(response => {
            return response.json()
               .then((authResponse: IAuthResponse) => {
                  if (!authResponse.AuthenticationResult) {
                     throw new Error("Invalid credentials");
                  }

                  const user: IUser = jwtDecode(authResponse.AuthenticationResult.IdToken) as IUser;
                  user.username = user["cognito:username"];
                  user.id = user.sub;
                  const accessToken = authResponse.AuthenticationResult.AccessToken;
                  const refreshToken = authResponse.AuthenticationResult.RefreshToken;

                  localStorage.setItem("accessToken", accessToken);
                  localStorage.setItem("refreshToken", refreshToken);
                  localStorage.setItem("user", JSON.stringify(user));

                  return user;
               });
         })
         .catch(error => {
            throw error;
         });
   }

   public async signOut(): Promise<void> {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
   }

   public signUp(username: string, email: string, password: string): Promise<IAuthSignUpResponse> {
      const payload = {
         Username: username,
         Password: password,
         UserAttributes: [
            {
               Name: "email",
               Value: email
            }
         ],
         ClientId: "55f5a6mpu0836rk8tk56uqdmt3"
      };

      const options = {
         method: "POST",
         body: JSON.stringify(payload),
         headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp"
         }
      };

      return fetch(this.baseUrl, options)
      .then(response => {
         return response.json();
      })
      .catch(error => {
         throw error;
      });
   }

   public verifySignUp(username: string, code: string): Promise<void> {
      const payload = {
         ClientId: "55f5a6mpu0836rk8tk56uqdmt3",
         ConfirmationCode: code,
         Username: username
      };

      const options = {
         method: "POST",
         body: JSON.stringify(payload),
         headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp"
         }
      };

      return fetch(this.baseUrl, options)
         .then(response => {
            return response.json();
         })
         .catch(error => {
            throw error;
         });
   }

   public getUser(): IUser | null {
      const user = localStorage.getItem("user");

      if (!user) {
         return null;
      }

      return JSON.parse(user) as IUser;
   }

   public isAuthenticated(): boolean {
      return !!this.getUser();
   }
}