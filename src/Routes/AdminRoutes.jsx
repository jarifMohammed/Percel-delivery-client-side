import Spinner from "@/Components/Shared/Spinner";
import useAdmin from "@/Hooks/useAdmin";
import { AuthContext } from "@/Providers/AuthProvider";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoutes = (children) => {
    const [user, loading] =useContext(AuthContext)
    const [role,isLoading] = useAdmin()
    const location = useLocation()
    if(loading || isLoading){
        return  <Spinner></Spinner>
    }
    if (user && role === "admin") {
        return children
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default AdminRoutes;