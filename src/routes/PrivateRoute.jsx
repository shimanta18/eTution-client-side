import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children,allowedRoles }) {
  const { user ,loading} = useAuth()
  console.log("PrivateRoute - User:",user);
  console.log("PrivateRoute - Loading:",loading);
  
// loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  

 if (!user) {
    return <Navigate to="/login" state={location.pathname} replace />;
  }

  return children;
}
