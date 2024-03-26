import { authHeader } from "../Auth/authHeader";

export interface IApiService {
   get<T>(endpoint: string): Promise<T>;
   post<T>(endpoint: string, body: unknown): Promise<T>;
}

export class ApiService implements IApiService {
   private baseUrl: string = "https://localhost:7004";

   public post<T>(
      endpoint: string,
      body: unknown
   ): Promise<T> {
      const options = {
         method: "POST",
         body: JSON.stringify(body),
         header: { ...{ "Content-Type": "application/json" }, ...authHeader() }
      };

      return fetch(`${this.baseUrl}${endpoint}`, options)
      .then(response => response.json());
   }

   public async get<T>(endpoint: string): Promise<T> {
      const authorizationHeader = authHeader();
      const options = {
         method: "GET",
         headers: { ...{ "Content-Type": "application/json" }, ...authorizationHeader }
      };

      return fetch(`${this.baseUrl}${endpoint}`, options)
      .then(res => {
         if (res.ok) {
            return res.json();
         }

         throw new Error("Failed to fetch");
      })
      .catch(error => {
         throw error;
      });

      
   }
}
