import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '../LayOut/AuthLayout'
import RootLayOut from '../LayOut/RootLayOut'
import Login from '../Pages/Auth/Login/Login'
import Register from '../Pages/Auth/Register/Register'
import StudentDashboard from '../Pages/dashBoard/StudentDashBoard'
import TutorDashboard from '../Pages/dashBoard/TutorDashboard'
import Home from '../Pages/Main Home/Home/Home'
import ProtectedRoute from "./ProtectedRoute"

import useAuth from '../hooks/useAuth'
import About from '../Pages/About/About'
import Contact from '../Pages/Contact/Contact'
import AdminDashBoard from '../Pages/dashBoard/AdminDashBoard'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import TuitionDetails from '../Pages/TuitionDetails/TuitionDetails'
import Tuitions from '../Pages/Tutions/Tuitions'
import TutorProfile from '../Pages/TutorProfile/TutorProfile'
import Tutors from '../Pages/Tutors/Tutors'



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
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:'/',
                Component:Home 
            },
            {
                path:'about',
                element:<About></About>,
            },

            {
                path:'contact',
                element:<Contact></Contact>,
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
                path:'tutors',
                element:<Tutors></Tutors>
            },
            {
                path:'tutors/:id',
                element:<TutorProfile></TutorProfile>
            },
            {
                path:'dashboard',
                element:<ProtectedRoute><DashboardRedirect></DashboardRedirect></ProtectedRoute>
            },

            {
                path:'dashboard/admin',
                element:(
                    <ProtectedRoute allowedRoles={["admin"]}><AdminDashBoard></AdminDashBoard></ProtectedRoute>
                )
            },

            // Tutor dashboard

            {
                path:'dashboard/tutor',
                element:(
                    <ProtectedRoute
                        allowedRoles={["tutor"]}><TutorDashboard></TutorDashboard>
                    </ProtectedRoute>
                )
            },

            // Student dashboard
            {
                path:'dashboard/student',
                element:(
                    <ProtectedRoute
                         allowedRoles={["student"]}><StudentDashboard></StudentDashboard>
                    </ProtectedRoute>
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
