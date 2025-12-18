import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const DashBoardLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  
  if (user?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  } 


  else if (user?.role === 'tutor') { 
    return <Navigate to="/dashboard/tutor" replace />;
  } 

  
  else {
    return <Navigate to="/dashboard/student" replace />;
  }
}

export default DashBoardLayout;