import { FormProvider, useForm } from "react-hook-form";
import "./Auth.scss"
import { useEffect, useState } from "react";
import { AuthService } from "../../Providers/Auth/AuthService";
import { IUser } from "../../Types/IUser";

interface ISignInFormProps {
   email: string;
   password: string;
}

interface ISignUpFormProps {
   email: string;
   password: string;
   confirmPassword: string;
}

export interface ISignInProps {
   onSignIn: () => void;
}

const SignIn = ({ onSignIn }: ISignInProps) => {
   const authService = new AuthService();
   const [user, setUser] = useState<IUser | null>(null);
   const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
   const methods = useForm<ISignInFormProps>();
   const signUpMethods = useForm<ISignUpFormProps>();

      useEffect(() => {
      setUser(authService.getUser());
   }, []);

   useEffect(() => {
      if (!user) {
         return;
      }

      onSignIn();
   }, [user]);

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

   const trySignUp = (data: ISignUpFormProps) => {
   }

   return (
      <div className="main-container">
         {
            !user &&
            <>
               {
                  mode === "sign-in" &&
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
                           <div className="form-row form-actions">
                              <button className="btn">Sign In</button>
                           </div>
                           <div className="form-row form-actions">
                              <a className="sign-up" onClick={() => setMode("sign-up")}>Sign Up</a>
                           </div>

                        </form>
                     </FormProvider>
                  </div>
               }
               {
                  mode === "sign-up" &&
                  <div className="sign-up-container">
                     <FormProvider {...signUpMethods}>
                        <form action="" className="sign-in-form" onSubmit={signUpMethods.handleSubmit(trySignUp)}>
                        <div className="form-row">
                              <label htmlFor="email">Email</label>
                              <input
                                 type="email"
                                 placeholder="Email"
                                 {
                                 ...signUpMethods.register("email", {
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
                                 ...signUpMethods.register("password", {
                                    required: {
                                       value: true,
                                       message: "Password is required"
                                    }
                                 })
                                 } />
                           </div>
                           <div className="form-row">
                              <label htmlFor="confirmPassword">Confirm Password</label>
                              <input
                                 type="password"
                                 placeholder="Confirm password"
                                 {
                                 ...signUpMethods.register("confirmPassword", {
                                    required: {
                                       value: true,
                                       message: "Please confirm password"
                                    }
                                 })
                                 } />
                           </div>
                           <div className="form-row form-actions">
                              <a className="sign-up" onClick={() => setMode("sign-in")}>Sign In</a>
                           </div>
                        </form>
                     </FormProvider>
                  </div>
               }
            </>
         }

      </div>
   )
}

export default SignIn