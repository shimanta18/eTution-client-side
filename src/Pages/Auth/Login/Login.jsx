import { useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth"
import SocialLogin from "../SocialLogin/SocialLogin"

const Login = () => {

 const [email,setEmail] = useState("")
const[password,setPassword] = useState("")
 const{signInUser} = useAuth()
 const navigate = useNavigate()
 const location = useLocation()
 const [loading,setLoading] =useState(false)
 const[error,setError] = useState("")
 

const apiUrl = import.meta.env.VITE_API_URL;

 const handleSubmit =async (e)=>{
e.preventDefault()
 setError("")
setLoading(true)

try{
  const result = await signInUser(email,password)
  const user = result.user;

  console.log("Login successful. UID:", user.uid)

  const roleResponse = await fetch(`${apiUrl}/api/users/${user.uid}`)

  if(!roleResponse.ok){
    let errorText = await roleResponse.text();

    try{
      const errorData = JSON.parse(errorText);
      errorText = errorData.error || errorText;
    }
    catch(e){
      throw new Error(`API Request failed with status ${roleResponse.status}. Server returned HTML/non-JSON content.`);
    }

    throw new Error(errorText)
  }

  const userData = await roleResponse.json();
  const userRole = userData.role;

  console.log("User Role Fetched:", userRole);

  const targetPath = userRole === "tutor"
            ? "/dashboard/tutor"
            : "/dashboard/student";

    navigate(location?.state || targetPath);
}

catch(error) {
   console.error("Login/Role Fetch error:", error)
     
 const displayError = error.message.includes('Firebase') 
            ? error.message.replace('Firebase: Error (', '').replace(').', '')
            : error.message; 
            
        setError(displayError);
    }
 
  finally {
        setLoading(false);
    }
 }
 
 return (
  <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
   <div className=" bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
    <p className="text-center text-gray-500 mb-8">Login to manage your tuition activities</p>
        {/* Display Error Message */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 font-medium" role="alert">
                {error}
            </div>
        )}

 <form onSubmit={handleSubmit} className="space-y-6">
 
 <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
     <input
  type="email"
  required
  value={email}
  onChange={(e)=> setEmail(e.target.value)}
  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"/>
 </div>
 <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
  <input 
 type="password" 
  required
 value={password}
 onChange={(e)=> setPassword(e.target.value)}
 className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"

 />
 </div>
<button       
    type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition transform active:scale-95 disabled:bg-gray-400">
 {loading ? 'Logging In...' : 'Login'}
 </button>
</form>
 <SocialLogin />
</div>
 </div>
 )
}

export default Login