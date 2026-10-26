import React from "react";
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { LandingPage } from "./components-landing/LandingPage.jsx";
import { LoginPage } from "./components-login/LoginPage";
import {ForgetPassword} from "./components-login/ForgetPassword.jsx";
import { OtpForgotPassword } from "./components-login/OtpForgotPassword.jsx";
import { ResetPassword } from "./components-login/ResetPassword.jsx";
import { PasswordResetSuccess } from "./components-login/PasswordResetSuccess.jsx";
import { Welcome } from "./components-registration/Welcome.jsx";
import { CompanyRegistration } from "./components-registration/CompanyRegistration.jsx";
import { InternRegistration } from "./components-registration/InternRegistration.jsx";
import { AdminRegistration } from "./components-registration/AdminRegistration.jsx";
import { MentorRegistration } from "./components-registration/MentorRegistration.jsx";
import { HrRegistration } from "./components-registration/HRRegistration.jsx";


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
  },
  {
    path:"/components-registration/welcome",
    element:<Welcome/>
  }, 
   {
    path:"/components-registration/CompanyRegistration",
    element:<CompanyRegistration/>
  }, 
   {
    path:"/components-registration/InternRegistration",
    element:<InternRegistration/>
  }, 
   {
    path:"/components-registration/AdminRegistration",
    element:<AdminRegistration/>
  }, 
   {
    path:"/components-registration/MentorRegistration",
    element:<MentorRegistration/>
  }, 
   {
    path:"/components-registration/HrRegistration",
    element:<HrRegistration/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;