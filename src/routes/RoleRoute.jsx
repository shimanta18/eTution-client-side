
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function RoleRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

   console.log("RoleRoute - User:", user);
  console.log("RoleRoute - Allowed Roles:", allowedRoles);

 useEffect(() => {
  const apiUrl = import.meta.env.VITE_API_URL;

  
    const fetchUserRole = async () => {
      if (user) {
        try {
          



          const response = await fetch(`${apiUrl}/users/${user.uid}`);
          
          if (response.ok) {
            const userData = await response.json();
            console.log("RoleRoute - User Data from DB:", userData);
            setUserRole(userData.role);
          } 
          
          else {
            console.log("RoleRoute - User not found in database");
          }
        } 
        
        catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
      setCheckingRole(false);
    };


    if (!loading) {
      fetchUserRole();
    }
  }, [user, loading]);


  if (loading || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (userRole && !allowedRoles.includes(userRole)) {

    if (userRole === "tutor") {
      return <Navigate to="/dashboard/tutor" replace />;
    } 
    
    else if (userRole === "student") {
      return <Navigate to="/dashboard/student" replace />;
    }
    
    else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}