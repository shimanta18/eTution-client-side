import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">


{/*column 1 */}
            <div>
            <h3 className="text-2xl font-bold mb-4 ">eTuitionBd</h3>
            <p className=" leading-relaxed">
              Connecting students with the best tutors worldwide. Secure, fast, and reliable tuition management.
            </p>
          </div>

{/*column 2 */}
           <div>
            <h3 className="text-xl font-semibold mb-4 ">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className=" hover:text-indigo-600 transition-colors duration-200"><Link to="/">Home</Link></a></li>
              <li><a href="#" className=" hover:text-indigo-600 transition-colors duration-200"><Link to="/tuitions">Find Tuition</Link></a></li>
              <li><a href="#" className=" hover:text-indigo-600 transition-colors duration-200"><Link to="/register">Become a Tutor</Link></a></li>
              <li><a href="#" className=" hover:text-indigo-600 transition-colors duration-200"><Link to="/about">About</Link></a></li>
            </ul>
          </div>


          <div>
            <h3 className="text-xl font-semibold mb-4 ">Contact</h3>
            <ul className="space-y-3">
                <li><a href="mailto:info@communityconnect.com" className=" hover:text-indigo-600 transition-colors duration-200">hello@etuitionbd.com</a></li>
              <li><a href="tel:+15551234567" className=" hover:text-indigo-600 transition-colors duration-200">+8801819890701</a></li>
            </ul>
            <div className="flex space-x-4 mt-6">
                            <a href="#" aria-label="Instagram" className=" hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaSquareInstagram className="h-6 w-6" /> 
                            </a>
                            <a href="#" aria-label="Twitter" className=" hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaSquareXTwitter className="h-6 w-6" /> 
                            </a>
                            <a href="#" aria-label="facebook" className=" hover:text-indigo-600 transition-colors duration-200">
                                
                                <FaFacebookSquare className="h-6 w-6" /> 
                            </a>
                        </div>
          </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
