import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const API_BASE_URL = 'http://localhost:5000';

const Register = () => {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")

  const{registerUser,updateUserProfile}=useAuth()
  const navigate = useNavigate()
  
const handleRegister = (e) => {
e.preventDefault();
setError("")
    
    
    registerUser(email, password)
        .then(result => {
            const user = result.user;

            
            updateUserProfile({
                displayName: name,
                photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`
            })
            .then(async () => {
               
                const newUserDocument = {
                    uid: user.uid,
                    email: user.email,
                    name: name,
                    role: role, 
                    photoURL: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`,
                };
                
                
                try {
                    const saveResponse = await fetch(`${API_BASE_URL}/api/users/save`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newUserDocument),
                    });

                    if (!saveResponse.ok) {
                        // Handle failure to save to DB (e.g., delete Firebase user, show error)
                        throw new Error("Failed to save user role to database.");
                    }
                    
                    console.log('User registered and saved to MongoDB:', user.uid); 
                    
                   
                    if (role === "tutor") {
                        navigate("/dashboard/tutor");
                    } else {
                        navigate("/dashboard/student");
                    }
                } catch (dbError) {
                    console.error("Database save error:", dbError);
                    setError(dbError.message);
                }
            })
            .catch(profileError => {
                
                console.error("Error updating profile:", profileError);
                setError("Registration failed during profile setup.");
            });
        })
        .catch(authError => {
      
            console.error("Firebase registration error:", authError.message);
            setError(authError.message.replace('Firebase: Error (', '').replace(').', ''));
        });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Account
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

          {/* Full Name */}
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
