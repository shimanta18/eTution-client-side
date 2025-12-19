import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '../LayOut/AuthLayout'
import RootLayOut from '../LayOut/RootLayOut'
import Login from '../Pages/Auth/Login/Login'
import Register from '../Pages/Auth/Register/Register'
import StudentDashboard from '../Pages/dashBoard/StudentDashBoard'
import TutorDashboard from '../Pages/dashBoard/TutorDashboard'
import Home from '../Pages/Main Home/Home/Home'


import useAuth from '../hooks/useAuth'
import AdminDashBoard from '../Pages/dashBoard/AdminDashBoard'
import TuitionDetails from '../Pages/TuitionDetails/TuitionDetails'
import Tuitions from '../Pages/Tutions/Tuitions'
import PrivateRoute from './PrivateRoute'
import RoleRoute from './RoleRoute'


const DashboardRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role === 'admin') {
    return <Navigate to="/dashboard/admin" replace />;
  }

  if (user?.role === 'tutor') {
    return <Navigate to="/dashboard/tutor" replace />;
  }

  
  return <Navigate to="/dashboard/student" replace />;
};
export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayOut,
        children:[
            {
                path:'/',
                Component:Home 
            },

            {
                path:'tuitions',
                element:<Tuitions></Tuitions>
            },

            {
                path:'tuitions/:id',
                element:<TuitionDetails></TuitionDetails>
            },

            {
                path:'dashboard',
                element:<PrivateRoute><DashboardRedirect></DashboardRedirect></PrivateRoute>
            },

            {
                path:'dashboard/admin',
                element:(
                    <PrivateRoute><RoleRoute allowedRoles={["admin"]}><AdminDashBoard></AdminDashBoard></RoleRoute></PrivateRoute>
                )
            },

            // Tutor dashboard

            {
                path:'dashboard/tutor',
                element:(
                    <PrivateRoute>
                        <RoleRoute allowedRoles={["tutor"]}><TutorDashboard></TutorDashboard></RoleRoute>
                    </PrivateRoute>
                )
            },

            // Student dashboard
            {
                path:'dashboard/student',
                element:(
                    <PrivateRoute>
                        <RoleRoute allowedRoles={["student"]}><StudentDashboard></StudentDashboard></RoleRoute>
                    </PrivateRoute>
                )
            }
        ]
    },

    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'login',
                Component:Login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    }
])
 


export default router
