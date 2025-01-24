
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

import SignUp from "@/Pages/SignUp";
import Dashboard from "@/LayOut/Dashboard";
import AllUsers from "@/Pages/Admin/AllUsers";
import AllParcels from "@/Pages/Admin/AllParcels";
import AllDeliveryman from "@/Pages/Admin/AllDeliveryman";


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
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
      children:[
        {
           path:'/dashboard/all-users',
           element:<AllUsers></AllUsers>
        },
        {
          path:'/dashboard/all-parcels',
          element:<AllParcels></AllParcels>
       },
       {
        path:'/dashboard/all-deliveryman',
        element:<AllDeliveryman></AllDeliveryman>
     }
      ]
    },

    


  ]);