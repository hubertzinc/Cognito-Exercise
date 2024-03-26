import { FormProvider, useForm } from "react-hook-form";
import "./Auth.scss"
import { useEffect, useState } from "react";
import { AuthService } from "../../Providers/Auth/AuthService";
import { IUser } from "../../Types/IUser";
import { IStore } from "../../Types/IStore";
import { ApiService } from "../../Providers/Api/ApiService";
import { IUserProfile } from "../../Types/IUserProfile";

interface ISignInFormProps {
   email: string;
   password: string;
}

export interface ISignInProps {
   onSignIn : () => void;
}

const SignIn = ({ onSignIn }: ISignInProps) => {
   const authService = new AuthService();
   const apiService = new ApiService();
   const [user, setUser] = useState<IUser | null>(null);
      const [stores, setStores] = useState<IStore[] | null>([]);
   const methods = useForm<ISignInFormProps>();

   useEffect(() => {
      setUser(authService.getUser());
   }, [])

   useEffect(() => {
      if (!user) {
         return;
      }

      // apiService.get<IUserProfile>(`/user/${user.email}`)
      // .then(userProfile => {
      //       setUseProfile(userProfile);
      //    })
      //    .catch(error => {
      //       alert(error);
      //    });

      onSignIn();
   }, [user])

   useEffect(() => {
      if (!user) {
         return;
      }

      // apiService.get<IStore[]>(`/store/user/${user.email}`)
      //    .then(stores => {
      //       setStores(stores);
      //    })
      //    .catch(error => {
      //       alert(error);
      //    });
   }, [user])

   const trySignIn = (data: ISignInFormProps) => {
      console.log(data);

      authService.signIn(data.email, data.password)
         .then((user: IUser) => {
            setUser(user);
         })
         .catch(error => {
            alert(error);
         });
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

      </div>
   )
}

export default SignIn