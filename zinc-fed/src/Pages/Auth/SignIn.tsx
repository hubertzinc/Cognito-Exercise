import { FormProvider, useForm } from "react-hook-form";
import "./SignIn.scss"
import { useEffect, useState } from "react";
import { AuthService } from "../../Providers/Auth/AuthService";
import { IUser } from "../../Types/IUser";
import { IAuthSignUpResponse } from "../../Types/IAuthResponse";

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
  const [mode, setMode] = useState<"sign-in" | "sign-up" | "verify">("sign-in");
  const methods = useForm<ISignInFormProps>();

  const [verificationCode, setVerificationCode] = useState<string>("");
  const [signUpUsername, setSignUpUsername] = useState<string>("");
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
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const username = btoa(data.email);
    setSignUpUsername(username);

    authService.signUp(username, data.email, data.password)
      .then((response: IAuthSignUpResponse) => {
        if (response.UserSub && !response.UserConfirmed) {
          setMode("verify");
        }
      })
      .catch(error => {
        alert(error);
      });
  }

  const handleChangeVerificationCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(event.target.value);
  }

  const handleVerify = () => {
    if (!signUpUsername) {
      alert("Invalid username");
      return;
    }

    authService.verifySignUp(signUpUsername, verificationCode)
      .then(response => {
        console.log(response);
        alert("Account verified. Please sign in.");
        setMode("sign-in");
      })
      .catch(error => {
        alert(error);
      });
  }

  return (
    <div className="main-container">
      {
        !user &&
        <div className="overflow-hidden bg-white p-8 py-6">
          {
            mode === "sign-in" &&
            <div className="sign-in-container">
              <h2>Sign In</h2>
              <FormProvider {...methods}>
                <form className="sign-in-form" onSubmit={methods.handleSubmit(trySignIn)}>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>

                      <div className="mt-2">

                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="email"
                            placeholder="Email"
                            className="block flex-1 border-0 bg-white py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            {
                            ...methods.register("email", {
                              required: {
                                value: true,
                                message: "Email is required"
                              }
                            })
                            } />
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="form-row">

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
                    <button className="btn">Sign Up</button>
                  </div>
                  <div className="form-row form-actions">
                    <a className="sign-up" onClick={() => setMode("sign-in")}>Sign In</a>
                  </div>
                </form>
              </FormProvider>
            </div>
          }
          {
            mode === "verify" &&
            <div className="verify-container">
              <div className="form-row">
                Your account has been created. Please check your email for the verification code.
              </div>
              <div className="form-row">
                <input type="text" placeholder="Verification Code" onChange={handleChangeVerificationCode} />
              </div>
              <div className="form-row form-actions">
                <button className="btn" onClick={handleVerify}>Verify</button>
              </div>
            </div>
          }
        </div>



      }

    </div>
  )
}

export default SignIn