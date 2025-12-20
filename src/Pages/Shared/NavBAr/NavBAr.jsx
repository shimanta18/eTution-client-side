import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/tuitions">Tuitions</NavLink></li>
      <li><NavLink to="/tutors">Tutors</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8">
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold">eTuitionBd</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2 font-medium">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <>
            <Link to="/dashboard" title="Dashboard">
              <div className="w-10 h-10 bg-[#00a651] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm transition-transform hover:scale-110">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
            </Link>
            <button 
              onClick={handleLogOut}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="px-5 py-2 text-gray-700 font-medium hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/register" className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-all">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;