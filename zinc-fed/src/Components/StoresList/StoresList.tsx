import { useEffect, useState } from "react";
import { ApiService } from "../../Providers/Api/ApiService";
import { IStore } from "../../Types/IStore";
import { IUser } from "../../Types/IUser";
import "./StoresList.scss";

export interface IStoresListProps {
   user: IUser;
}


const StoresList = ({ user }: IStoresListProps) => {
   const apiService = new ApiService();
   const [stores, setStores] = useState<IStore[]>([]);

   useEffect(() => {
      if (!user) {
         return;
      }

      apiService.get<IStore[]>(`/store/user/${user.email}`)
         .then(stores => {
            setStores(stores);
         })
         .catch(error => {
            alert(error);
         });

   }, [user])
   
   return (
      <div className="stores-list">
         <h1>Available Stores</h1>

         <table>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Area</th>
                  <th>URL</th>
                  <th>Test Site URL</th>
                  <th>Client ID</th>
               </tr>
            </thead>
            <tbody>
               {
                  stores.length > 0 &&
                  stores.map(store => {
                     return (
                        <tr key={store.id}>
                           <td>{store.name}</td>
                           <td>{store.area}</td>
                           <td>{store.url}</td>
                           <td>{store.testSiteUrl}</td>
                           <td>{store.clientId}</td>
                        </tr>
                     );
                  })
               }
            </tbody>
         </table>
      </div>
   );
}

export default StoresList;