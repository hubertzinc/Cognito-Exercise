import { FormProvider, useForm } from "react-hook-form";
import "./Auth.scss"
import { useEffect, useState } from "react";
import { AuthService } from "../../Providers/Auth/AuthService";
import { IUser } from "../../Types/IUser";
import { IStore } from "../../Types/IStore";
import { ApiService } from "../../Providers/Api/ApiService";
import StoresList from "../../Components/StoresList/StoresList";
import { IUserProfile } from "../../Types/IUserProfile";

interface ISignInProps {
   email: string;
   password: string;
}

const SignIn = () => {
   const authService = new AuthService();
   const apiService = new ApiService();
   const [user, setUser] = useState<IUser | null>(null);
   const [userProfile, setUseProfile] = useState<IUserProfile | null>(null);
   const [stores, setStores] = useState<IStore[] | null>([]);
   const methods = useForm<ISignInProps>();

   useEffect(() => {
      setUser(authService.getUser());
   }, [])

   useEffect(() => {
      if (!user) {
         return;
      }

      apiService.get<IUserProfile>(`/user/${user.email}`)
      .then(userProfile => {
            setUseProfile(userProfile);
         })
         .catch(error => {
            alert(error);
         });
   }, [user])

   useEffect(() => {
      if (!user) {
         return;
      }

      apiService.get<IStore[]>("/store")
         .then(stores => {
            setStores(stores);
         })
         .catch(error => {
            alert(error);
         });
   }, [user])

   const trySignIn = (data: ISignInProps) => {
      console.log(data);

      authService.signIn(data.email, data.password)
         .then((user: IUser) => {
            setUser(user);
         })
         .catch(error => {
            alert(error);
         });
   }

   const signOut = () => {
      authService.signOut();
      setUser(null);
   }

   return (
      <div className="main-container">
         {
            !user &&
            <div className="sign-in-container">
               <FormProvider {...methods}>
                  <form className="sign-in-form" onSubmit={methods.handleSubmit(trySignIn)}>
                     <div className="form-row">
                        <label htmlFor="email">Email</label>
                        <input
                           type="email"
                           placeholder="Email"
                           {
                           ...methods.register("email", {
                              required: {
                                 value: true,
                                 message: "Email is required"
                              }
                           })
                           } />
                     </div>
                     <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <input
                           type="password"
                           placeholder="Password"
                           {
                           ...methods.register("password", {
                              required: {
                                 value: true,
                                 message: "Password is required"
                              }
                           })
                           } />
                     </div>
                     <div className="form-row">
                        <button className="btn">Sign In</button>
                        <button className="btn">Sign Up</button>
                     </div>
                  </form>
               </FormProvider>
            </div>
         }

         {user &&
            <>
               <div className="authenticated-content">
                  <div className="user-details-container">
                     {
                        <div className="user-info">
                           <div className="user-info__details">
                              <div>
                                 Logged in as <span className="user-info__name--bold">{user.username}</span><br />
                              </div>
                              <div>
                                 Email: <span className="user-info__name--bold">{user.email}</span><br />
                              </div>
                              <div>
                                 Id: <span className="user-info__name--bold">{user.id}</span>
                              </div>
                              <br/>
                              <h4>YOUR DETAILS FROM ZINCSTORE</h4>
                              <div>
                                 First Name: <span className="user-info__name--bold">{userProfile?.firstName}</span>
                              </div>
                              <div>
                                 Last Name: <span className="user-info__name--bold">{userProfile?.lastName}</span>
                              </div>
                              <div>
                                 Phone Number: <span className="user-info__name--bold">{userProfile?.phoneNumber}</span>
                              </div>
                           </div>

                        </div>
                     }
                  </div>

                  {stores &&
                     <div className="stores-container">
                        <StoresList stores={stores ?? []} />
                     </div>
                  }

                  <button className="btn" onClick={signOut} >Sign Out</button>
               </div>
            </>


         }
      </div>
   )
}

export default SignIn