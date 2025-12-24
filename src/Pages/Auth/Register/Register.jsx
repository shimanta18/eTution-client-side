import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
const [loading, setLoading] = useState(false);

  const{registerUser,updateUserProfile}=useAuth()
  const navigate = useNavigate()
  
const handleRegister = async (e) => {
e.preventDefault();
setError("")
    setLoading(true)

    try{
      const result=    await registerUser(email,password)
      const user = result.user
      console.log(' User registered with Firebase:', user.uid);

      await updateUserProfile({
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
      });
      console.log(' Profile updated');

      const newUserDocument = {
        uid: user.uid,
        email: user.email,
        name: name,
        role: role,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
        createdAt: new Date().toISOString()
      };

      console.log(' Sending to MongoDB:', newUserDocument);

  const saveResponse = await fetch(`${apiUrl}/users/save`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json',
    },

    body:JSON.stringify(newUserDocument)
  })

   const responseData = await saveResponse.json();
      console.log(' MongoDB response:', responseData);

      if (!saveResponse.ok) {
        throw new Error(responseData.error || "Failed to save user to database");
      
    }

    console.log('User saved to MongoDB')
    
    if(role === "tutor"){
      navigate("/dashboard/tutor")
    }

    else{
      navigate("/dashboard/student")
    }
  }
  catch(error){
    console.error("Registration error:",error)
    setError(error.message.replace('Firebase: Error (', '').replace(').', ''))
  }
  finally{
    setLoading(false)
  }
}
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100 rounded-lg">
            <button
              type="button"
              className={`py-2 rounded-md font-medium text-sm transition ${
                role === "student"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("student")}
            >
              I'm a Student
            </button>

            <button
              type="button"
              className={`py-2 rounded-md font-medium text-sm transition ${
                role === "tutor"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setRole("tutor")}
            >
              I'm a Tutor
            </button>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
              focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg 
            hover:bg-indigo-700 transition transform active:scale-95"
          >
            Register as {role === "student" ? "Student" : "Tutor"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
