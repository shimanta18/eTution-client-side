import { createBrowserRouter } from 'react-router-dom'
import AuthLayout from '../LayOut/AuthLayout'
import RootLayOut from '../LayOut/RootLayOut'
import Login from '../Pages/Auth/Login/Login'
import Register from '../Pages/Auth/Register/Register'
import StudentDashboard from '../Pages/dashBoard/StudentDashBoard'
import TutorDashboard from '../Pages/dashBoard/TutorDashboard'
import Home from '../Pages/Main Home/Home/Home'


import PrivateRoute from './PrivateRoute'
import RoleRoute from './RoleRoute'


export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayOut,
        children:[
            {
                path:'/',
                Component:Home
            },

            // Tutor dashboard

            {
                path:'dashboard/tutor',
                element:(
                    <PrivateRoute>
                        <RoleRoute role="tutor"><TutorDashboard></TutorDashboard></RoleRoute>
                    </PrivateRoute>
                )
            },

            // Student dashboard
            {
                path:'dashboard/student',
                element:(
                    <PrivateRoute>
                        <RoleRoute role="student"><StudentDashboard></StudentDashboard></RoleRoute>
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
