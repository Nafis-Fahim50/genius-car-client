import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    
    if(loading){
        return <button className="btn loading mx-auto my-12 ml-96">loading</button>
    }

    if(!user){
        return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    return children;
};

export default PrivateRoute;