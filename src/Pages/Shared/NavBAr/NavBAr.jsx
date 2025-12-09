import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const NavBar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/tuitions">Tuitions</NavLink></li>
      <li><NavLink to="/tutors">Tutors</NavLink></li>
      <li><NavLink to="/About">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>

      {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm mx-auto">
      
      <div className="navbar-start">
        
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
          >
            {links}
          </ul>
        </div>

        <Link to="/" className="text-xl font-bold">
          eTuitionBd
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-2">
                        <div className="hidden sm:block font-medium text-sm">{user.displayName || user.email}</div>
                        <a onClick={handleLogOut} className="btn btn-sm btn-ghost">Log Out</a>
                    </div>
        ) : (
          <div className="flex items-center gap-2 ">
                        <Link className="btn   text-xl" to="/login">Log In</Link> 
                        <Link className="btn  btn-primary text-xl" to="/register">Register</Link>
                         
                    </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
