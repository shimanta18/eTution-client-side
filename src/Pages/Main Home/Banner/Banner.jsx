import { Link } from "react-router"

const Banner = () => {
  return (
    <div className="relative text-center mx-auto p-9 bg-gradient-to-r from-primary to-indigo-800">
  <div className=" text-white py-24 px-12 overflow-hidden ">
    <div className=" mb-10 md:mb-0 z-10 ">
      <h1 className="text-5xl font-bold  py-4 ">Find the Perfect <span className="text-accent">Tutor</span> for Your Success</h1>
      <h1 className="py-text-8xl font-bold mb-6  ">
        Connecting ambitious students with expert educators. Transparent, secure, and fast.
      </h1>
      <div className=" flex justify-center sm:flex-row gap-4 ">
        <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg "><Link to='/tuitions'>Find Tuitions</Link></button>
      <button className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-bold  shadow-lg  hover:bg-white hover:text-primary transition"><Link to='/register'>Become a Tutor</Link></button>
      </div>
      
    </div>
  </div>
</div>
  )
}

export default Banner
