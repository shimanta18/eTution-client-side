import { createBrowserRouter } from 'react-router'
import AuthLayout from '../LayOut/AuthLayout'
import RootLayOut from '../LayOut/RootLayOut'
import Login from '../Pages/Auth/Login/Login'
import Register from '../Pages/Auth/Register/Register'
import Home from '../Pages/Main Home/Home/Home'

export const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayOut,
        children:[
            {
                index:true,
                Component:Home
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
