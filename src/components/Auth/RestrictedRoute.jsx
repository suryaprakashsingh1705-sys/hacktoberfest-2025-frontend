import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RestrictedRoute({ redirectTo = '/' }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // If user is authenticated, redirect to the provided path (default '/'),
  // otherwise render the child routes (login/register).
  return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
}
