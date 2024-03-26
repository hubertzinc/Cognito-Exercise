import { useEffect, useState } from 'react';
import './App.scss'
import SignIn from './Pages/Auth/SignIn'
import { AuthService } from './Providers/Auth/AuthService';
import { IUser } from './Types/IUser';
import UserDetails from './Components/User/UserDetails';
import StoresList from './Components/StoresList/StoresList';

const App = () => {

   const authService = new AuthService();
   const [user, setUser] = useState<IUser | null>(null);

   useEffect(() => {
      setUser(authService.getUser());
   }, []);

   useEffect(() => {
   }, [user]);

   const signIn = () => {
      setUser(authService.getUser());
   }

   const signOut = () => {
      authService.signOut();
      setUser(null);
   }

   return (
      <>
         { !user && <SignIn onSignIn={signIn}></SignIn> }

         {
            user &&
            <div className="authenticated-content">
               <UserDetails user={user}></UserDetails>
               <StoresList user={user}></StoresList>
               <button className="btn" onClick={signOut} >Sign Out</button>
            </div>
         }
      </>
   )
}


export default App
