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
import { HRRegistration } from "./components-registration/HRRegistration.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
   {
    path: "/forgotpassword",
    element: <ForgetPassword/>
  }
  ,
   {
    path: "/otpforgotpassword",
    element: <OtpForgotPassword/>
  } ,
   {
    path: "/resetpassword",
    element: <ResetPassword/>
  },
  {
    path:"/resetpasswordsuccess",
    element:<PasswordResetSuccess/>
  },
  {
    path:"/welcome",
    element:<Welcome/>
  }, 
   {
    path:"/CompanyRegistration",
    element:<CompanyRegistration/>
  }, 
   {
    path:"/InternRegistration",
    element:<InternRegistration/>
  }, 
   {
    path:"/AdminRegistration",
    element:<AdminRegistration/>
  }, 
   {
    path:"/MentorRegistration",
    element:<MentorRegistration/>
  }, 
   {
    path:"/HRRegistration",
    element:<HRRegistration/>
  }
],



);

function App() {
  return <RouterProvider router={router} />;
}

export default App;