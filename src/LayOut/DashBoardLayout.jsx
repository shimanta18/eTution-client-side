import { Navigate } from 'react-router'
import useAuth from '../hooks/useAuth'

const DashBoardLayout = () => {
  const {user,setUser}= useAuth()

  if(loading) return 
  <div>Loading...</div>

  if(user?.role ==="tutor"){
    return <Navigate to="/dashboard/tutor" replace></Navigate>
  }

  return <Navigate to="/dashboard/student"></Navigate>
}

export default DashBoardLayout
