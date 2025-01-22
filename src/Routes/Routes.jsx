
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

import SignUp from "@/Pages/SignUp";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        }
      ]
    },
    {
        path:'login',
        element:<Login></Login>
    },
    {
        path:'signup',
        element:<SignUp></SignUp>
    }
  ]);