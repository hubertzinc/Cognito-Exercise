export interface IAuthResponse {
   AuthenticationResult: IAuthenticationResult | null;
   message: string | null;
}

export interface IAuthenticationResult {
   AccessToken: string;
   ExpiresIn: number;
   IdToken: string;
   RefreshToken: string;
   TokenType: string;
}
