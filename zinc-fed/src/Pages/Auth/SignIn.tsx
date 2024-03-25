import { FormProvider, useForm } from "react-hook-form";
import "./Auth.scss"
import { useEffect, useState } from "react";
import { AuthService } from "../../Providers/Auth/AuthService";
import { IUser } from "../../Types/IUser";

interface ISignInProps {
   email: string;
   password: string;
}

const SignIn = () => {
   const authService = new AuthService();
   const [user, setUser] = useState<IUser | null>(null);
   const methods = useForm<ISignInProps>();

   useEffect(() => {
      setUser(authService.getUser());
   }, [])

   const trySignIn = (data: ISignInProps) => {
      console.log(data);

      authService.signIn(data.email, data.password)
         .then((user: IUser) => {
            setUser(user);

            // const user = jwtDecode(response);
            console.log(user);
         })
         .catch(error => {
            console.log(error);
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
                     </div>
                     <button className="btn" onClick={signOut} >Sign Out</button>
                  </div>
               }
            </div>
         }
      </div>
   )
}

export default SignIn