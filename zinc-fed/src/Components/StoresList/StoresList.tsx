import { IStore } from "../../Types/IStore";
import "./StoresList.scss";

export interface IStoresListProps {
   stores: IStore[];
}

const StoresList = ({ stores }: IStoresListProps) => {
   return (
        <div className="stores-list">
            <h1>Stores</h1>

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
                  {stores.map(store => {
                     return (
                        <tr key={store.id}>
                           <td>{store.name}</td>
                           <td>{store.area}</td>
                           <td>{store.url}</td>
                           <td>{store.testSiteUrl}</td>
                           <td>{store.clientId}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
        </div>
    );
}

export default StoresList;