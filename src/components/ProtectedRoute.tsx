import { Navigate } from "react-router-dom";
import { useAuth } from "../supabase/Auth";
import React from "react";

const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth()

    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return <>{children}</>
};

export default ProtectedRoute