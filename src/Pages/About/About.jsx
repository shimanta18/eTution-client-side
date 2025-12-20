import { FiAward, FiCheckCircle, FiEye, FiGlobe, FiTarget, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        
      

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#eff6ff] p-10 rounded-3xl border border-blue-50">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-6">
              <FiTarget size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To empower students by providing a seamless, secure, and transparent platform to find the perfect mentors who can unlock their full potential.
            </p>
          </div>

          <div className="bg-[#f0f9ff] p-10 rounded-3xl border border-blue-50">
            <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white mb-6">
              <FiEye size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the global standard for private tutoring, where knowledge transfer is unhindered by geography or complex administration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-24">
          <div className="space-y-2">
            <FiUsers className="mx-auto text-indigo-500 mb-4" size={32} />
            <h3 className="text-4xl font-extrabold text-gray-900">10,000+</h3>
            <p className="text-gray-500 font-medium">Happy Students</p>
          </div>


          <div className="space-y-2">
            <FiAward className="mx-auto text-indigo-500 mb-4" size={32} />
            <h3 className="text-4xl font-extrabold text-gray-900">2,500+</h3>
            <p className="text-gray-500 font-medium">Verified Tutors</p>
          </div>


          <div className="space-y-2">
            <FiGlobe className="mx-auto text-indigo-500 mb-4" size={32} />
            <h3 className="text-4xl font-extrabold text-gray-900">15+</h3>
            <p className="text-gray-500 font-medium">Countries Reached</p>
          </div>
        </div>

        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Core Values</h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <FiCheckCircle className="mx-auto text-indigo-600 mb-6" size={40} />
            <h3 className="text-xl font-bold mb-3">Quality First</h3>
            <p className="text-gray-500 text-sm">Every tutor undergoes a rigorous verification process to ensure pedagogical excellence.</p>
          </div>

          
          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <FiGlobe className="mx-auto text-indigo-600 mb-6" size={40} />
            <h3 className="text-xl font-bold mb-3">Accessibility</h3>
            <p className="text-gray-500 text-sm">Breaking financial and geographical barriers to make top-tier education available for all.</p>
          </div>


          <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <FiTarget className="mx-auto text-indigo-600 mb-6" size={40} />
            <h3 className="text-xl font-bold mb-3">Transparency</h3>
            <p className="text-gray-500 text-sm">Clear communication, honest ratings, and secure payments are the heart of our platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;