import { createBrowserRouter } from "react-router-dom";
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
import MyDeliveries from "@/Pages/DeliveryBoy/MyDeliveries";
import MyReviews from "@/Pages/DeliveryBoy/MyReviews";
import UserRoutes from "./UserRoutes";
import DeliveryManRoute from "./DeliveryManRoute";
import About from "@/Pages/About";
import ErrorPage from "@/Pages/ErrorPage";
import Payment from "@/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/about",
        element: <About></About>,
      },
    ],
  },
  {
    path: "login",
    element: <Login></Login>,
    errorElement: <ErrorPage />,
  },
  {
    path: "signup",
    element: <SignUp></SignUp>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoutes>
            <AllUsers></AllUsers>
          </AdminRoutes>
        ),
      },

      {
        path: "/dashboard/all-parcels",
        element: (
          <AdminRoutes>
            <AllParcels></AllParcels>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/all-deliveryman",
        element: (
          <AdminRoutes>
            <AllDeliveryman></AllDeliveryman>
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <UserRoutes>
            <Payment></Payment>
          </UserRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://quick-drop-server-opal.vercel.app/parcels/payment/${params.id}`
          ),
      },
      {
        path: "/dashboard/book-parcel",
        element: (
          <UserRoutes>
            <BookParcels></BookParcels>
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/my-parcels",
        element: (
          <UserRoutes>
            <MyParcels></MyParcels>
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <UserRoutes>
            <Profile></Profile>
          </UserRoutes>
        ),
      },
      {
        path: "/dashboard/update/:id",
        element: (
          <UserRoutes>
            <UpdateParcel></UpdateParcel>
          </UserRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://quick-drop-server-opal.vercel.app/parcels/update/${params.id}`
          ),
      },
      {
        path: "/dashboard/deliveries",
        element: (
          <DeliveryManRoute>
            <MyDeliveries></MyDeliveries>
          </DeliveryManRoute>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <DeliveryManRoute>
            <MyReviews></MyReviews>
          </DeliveryManRoute>
        ),
      },
    ],
  },
]);
