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

export interface IAuthSignUpResponse {
   UserConfirmed: boolean;
   UserSub: string;
   CodeDeliveryDetails: ICodeDeliveryDetails;
}

export interface ICodeDeliveryDetails {
   AttributeName: string;
   DeliveryMedium: string;
   Destination: string;
}