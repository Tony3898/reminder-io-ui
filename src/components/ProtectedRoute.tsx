import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthService } from '../contexts/ServicesContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authService = useAuthService();
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
