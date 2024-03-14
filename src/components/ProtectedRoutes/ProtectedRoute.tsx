import React from 'react';
import { useAppSelector } from "../../hooks/reduxHook";
import { Navigate, RouteProps } from 'react-router-dom';



const ProtectedRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
    const isLogged = useAppSelector((state) => state.usersReducer.isLogged);

    return isLogged ? React.createElement(element!.type, rest) : <Navigate to="/" />;
};

export default ProtectedRoute;
