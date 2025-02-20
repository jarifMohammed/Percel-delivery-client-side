import { AuthContext } from "@/Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import axiosSecure from "./axiosSecure";


const useAdmin = () => {
    const axios = axiosSecure()
    const {user} = useContext(AuthContext)
    const {data : role ,isLoading} = useQuery({
        queryKey: [user?.email, 'role'],
        queryFn: async() => {
            const res = await axios.get(`/users/admin/${user.email}`)
            // console.log(res.data);
            return res.data?.role
        }
    })
return [role,isLoading]
   
};

export default useAdmin;