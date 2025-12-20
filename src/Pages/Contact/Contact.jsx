import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-[40px] shadow-sm overflow-hidden flex flex-col lg:flex-row border border-gray-100">
        
        {/* Left Side: Contact Information (Purple Sidebar) */}
        <div className="lg:w-1/3 bg-[#4f46e5] p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          


          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-10">Contact Information</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
        <FiMapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Our Office</h3>
    <p className="text-indigo-100 text-sm leading-relaxed">Jamuna Future park<br />Dhaka, 8209
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FiPhone size={24} />


                </div>
                <div>
                  <h3 className="font-bold text-lg">Phone Number</h3>
                  <p className="text-indigo-100 text-sm">+8801819890701</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <FiMail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Support</h3>
                  <p className="text-indigo-100 text-sm">hello@etuitionbd.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <h3 className="font-bold mb-4">Operating Hours</h3>
            <div className="flex items-center gap-2 text-sm text-indigo-100">
              <FiClock /><span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="lg:w-2/3 p-10 lg:p-16">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Name"
                  className="w-full px-5 py-4 bg-[#334155] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  placeholder="xyz@example.com"
                  className="w-full px-5 py-4 bg-[#334155] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>



            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Subject</label>
              <input 
                type="text" 
                placeholder="How can we help?"
                className="w-full px-5 py-4 bg-[#334155] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-gray-400"
              />
            </div>




            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Your Message</label>
              <textarea 
                rows="5"
                placeholder="what you want know??..."
                className="w-full px-5 py-4 bg-[#334155] text-white rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-gray-400"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="px-10 py-4 bg-[#4f46e5] text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
            >Send Message <FiSend size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;