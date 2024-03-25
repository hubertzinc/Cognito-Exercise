import { authHeader } from "../Auth/authHeader";

export interface IApiService {
   get<T>(endpoint: string): Promise<T>;
   post<T>(endpoint: string, body: unknown): Promise<T>;
}

export class ApiService implements IApiService {
   private baseUrl: string = "";

   public post<T>(
      endpoint: string,
      body: unknown
   ): Promise<T> {
      const options = {
         method: "POST",
         body: JSON.stringify(body),
         header: { ...{ "ContentType:": "application/json" }, ...authHeader() }
      };

      return fetch(`${this.baseUrl}${endpoint}`, options)
      .then(response => response.json());
   }

   public async get<T>(endpoint: string): Promise<T> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
         method: "GET",
         headers: { ...{ "ContentType:": "application/json" }, ...authHeader() }
      });

      return await response.json();
   }
}
