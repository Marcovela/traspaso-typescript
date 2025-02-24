import React, { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

interface RouteProps {
    element: ComponentType;
}

export const ProtectedRoute: React.FC<RouteProps> = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? (
        <Component />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export const AdminRoute: React.FC<RouteProps> = ({ element: Component }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? (
        <Component />
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};