import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { LandingPage } from "./components-login/LandingPage.jsx";
import { LoginPage } from "./components-login/LoginPage";
import {ForgetPassword} from "./components-login/ForgetPassword.jsx";
import { OtpForgotPassword } from "./components-login/OtpForgotPassword.jsx";
import { ResetPassword } from "./components-login/ResetPassword.jsx";
import { PasswordResetSuccess } from "./components-login/PasswordResetSuccess.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/components-login/login",
    element: <LoginPage/>
  },
   {
    path: "/components-login/forgotpassword",
    element: <ForgetPassword/>
  }
  ,
   {
    path: "/components-login/otpforgotpassword",
    element: <OtpForgotPassword/>
  } ,
   {
    path: "/components-login/resetpassword",
    element: <ResetPassword/>
  },
  {
    path:"/components-login/resetpasswordsuccess",
    element:<PasswordResetSuccess/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;