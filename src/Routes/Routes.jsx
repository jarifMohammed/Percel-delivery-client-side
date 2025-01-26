
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
import PrivateRoute from "./PrivateRoute";
// import BookParcles from "@/Pages/Users/BookParcels";
import BookParcels from "@/Pages/Users/BookParcels";
import MyParcels from "@/Pages/Users/MyParcels";
import Profile from "@/Pages/Users/Profile";
import UpdateParcel from "@/Pages/Users/UpdateParcel";
import AdminRoutes from "./AdminRoutes";


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
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
           path:'/dashboard/all-users',
           element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
        {
          path:'/dashboard/all-parcels',
          element:<AdminRoutes><AllParcels></AllParcels></AdminRoutes>
       },
       {
        path:'/dashboard/all-deliveryman',
        element:<AdminRoutes><AllDeliveryman></AllDeliveryman></AdminRoutes>
     },
     {
      path:'/dashboard/book-parcel',
      element:<BookParcels></BookParcels>

     },
     {
      path:'/dashboard/my-parcels',
      element:<MyParcels></MyParcels>
     },
     {
      path:'/dashboard/profile',
      element:<Profile></Profile>
     },
     {
      path:'/dashboard/update/:id',
      element:<UpdateParcel></UpdateParcel>,
      loader:({params}) => fetch(`http://localhost:3000/parcels/update/${params.id}`)

      
     }
      ]
    },

    


  ]);