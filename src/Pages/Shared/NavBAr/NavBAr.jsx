import { NavLink } from "react-router"

const NavBAr = () => {

  

 

  const links=<>
  <li><NavLink to="/">Home</NavLink></li>
  <li><NavLink to="">Tuitions</NavLink></li>
  <li><NavLink to= "">Tutors</NavLink></li>
  <li><NavLink to="">About</NavLink></li>
  <li><NavLink to="">Contact</NavLink></li>
  </>
  return (
    <div className="navbar bg-base-100 shadow-sm mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      
    </div>
    <a className=" text-xl">eTuitionBd</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <div className="flex ">
     {links}
    </div>
    </ul>
</div>

</div>
  )
}

export default NavBAr
