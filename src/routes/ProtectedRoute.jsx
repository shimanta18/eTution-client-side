import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log(" ProtectedRoute Check:");
  console.log("  - User:", user?.email);
  console.log("  - User Role:", user?.role);
  console.log("  - Loading:", loading);
  console.log("  - Allowed Roles:", allowedRoles);

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log(" No user - redirecting to login");
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  
  if (!allowedRoles || allowedRoles.length === 0) {
    console.log(" No role restriction - access granted");
    return children;
  }

  
  const userRole = user.role || 'student'; 

  if (!allowedRoles.includes(userRole)) {
    console.log(` Access denied - User role: ${userRole}, Required: ${allowedRoles.join(', ')}`);
    
    
    if (userRole === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    } else if (userRole === 'tutor') {
      return <Navigate to="/dashboard/tutor" replace />;
    } else {
      return <Navigate to="/dashboard/student" replace />;
    }
  }

  
  console.log(" Access granted");
  return children;
}