import Spinner from '@/Components/Shared/Spinner';
import { AuthContext } from '@/Providers/AuthProvider';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user ,loading} = useContext(AuthContext)
    if(loading){
        return  <Spinner></Spinner>
    }
    if (user) {
        return children
    }

    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;