import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function RoleRoute({ children, role }) {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
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

  
  if (userRole !== role) {

    if (userRole === "tutor") {
      return <Navigate to="/dashboard/tutor" replace />;
    } else if (userRole === "student") {
      return <Navigate to="/dashboard/student" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}