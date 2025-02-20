import Spinner from "@/Components/Shared/Spinner";
import useAdmin from "@/Hooks/useAdmin";
import { AuthContext } from "@/Providers/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const UserRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Properly access the context
  const [role, isLoading] = useAdmin();
  const location = useLocation();

  if (loading || isLoading) {
    return <Spinner />;
  }

  if (user && role === "user") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default UserRoutes;
