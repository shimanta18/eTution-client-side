
const Login = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className=" bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to manage your tuition activities</p>
        <form className="space-y-6">

          
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
          type="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
             
            />
        </div>

        <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition transform active:scale-95">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
