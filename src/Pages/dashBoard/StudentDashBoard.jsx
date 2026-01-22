import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const StudentDashBoard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My Tuitions');
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(false);

const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    subject: '',
    classGrade: '',
    location: '',
    budget: '',
    description: ''
  });

  const tabs = ['My Tuitions', 'Post Tuition', 'Applications', 'Payments', 'Profile'];

  useEffect(() => {
    if (activeTab === 'My Tuitions') {
      fetchMyTuitions();
    }
  }, [activeTab, user]);





  const fetchMyTuitions = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      
      const response = await fetch(`${apiUrl}/api/tuitions/student/${user.uid}`)
      
      if (response.ok) {
        const data = await response.json();
        setTuitions(data);
      } 
      
      else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Failed to fetch:', response.status, errorData.message);
      }
    } 
    
    catch (error) {
      console.error('Network Error:', error);
    } 
    
    finally {
      setLoading(false);
    }
  
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/tuitions/student/${user.uid}`);

      if (response.ok) {
        const data = await response.json();
        setTuitions(data);
      }
    }
    
    catch (error) {
      console.error('Error fetching tuitions:', error);
    } 
    
    finally {
      setLoading(false);
    }
  };

  const handleTuitionPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tuitionData = {
        ...formData,
        studentId: user.uid,
        studentName: user.displayName,
        studentEmail: user.email,
        status: 'PENDING',
        postedAt: new Date().toISOString()
      };

      console.log('Posting tuition:', tuitionData);
      

      const response = await fetch(`${apiUrl}/api/tuitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify(tuitionData)


      });

      if (response.ok) {
        alert('Tuition posted successfully!');
        setFormData({
          subject: '',
          classGrade: '',
          location: '',
          budget: '',
          description: ''
        })
        
        ;
        setActiveTab('My Tuitions');
        fetchMyTuitions();
      } 
      
      else {
        const error = await response.json();
        alert('Failed to post tuition');
      }
    } 
    
    catch (error) {
      console.error('Error posting tuition:', error);
      alert('Error posting tuition');
    }
    
    
    finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeleteTuition = async (tuitionId) => {
    if (!confirm('Are you sure you want to delete this tuition?')) return;

    try {
      const response = await fetch(`${apiUrl}/api/tuitions/${tuitionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Tuition deleted successfully!');
        fetchMyTuitions();
      } 
      
      else {
        alert('Failed to delete tuition');
      }
    }
    
    catch (error) {
      console.error('Error deleting tuition:', error);
      alert('Error deleting tuition');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    }
    
    catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
        
        <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-200">
         
          <span className="text-lg font-bold  text-gray-900">eTuitionBd</span>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-600 font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'S'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.displayName || 'Student'}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Student</p>
            </div>
          </div>
        </div>



        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
        </nav>




        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        

        
        <header className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
              
              
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{activeTab}</h2>

            {/* My Tuitions Tab */}
            {activeTab === 'My Tuitions' && (
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : tuitions.length > 0 ? (
                  tuitions.map((tuition) => (
                    <div 
                      key={tuition._id} 
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {tuition.subject} - {tuition.classGrade}
                          </h3>
                          <p className={`text-xs font-medium mb-3 ${
                            tuition.status === 'APPROVED' ? 'text-green-600' :
                            tuition.status === 'PENDING' ? 'text-orange-500' :
                            'text-red-600'
                          }`}>
                            Status: {tuition.status}
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600"> {tuition.location}</p>
                            <p className="text-sm text-gray-600"> Budget: ৳{tuition.budget}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDeleteTuition(tuition._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-gray-500">No tuitions posted yet. Create your first tuition request!</p>
                  </div>
                )}
              </div>
            )}










            {/* Post Tuition Tab */}
            {activeTab === 'Post Tuition' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl">
                <form onSubmit={handleTuitionPost} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Mathematics"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Class/Grade
                      </label>
                      <input
                        type="text"
                        name="classGrade"
                        value={formData.classGrade}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Class 10"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Dhanmondi, Dhaka"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Budget (৳)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 5000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      placeholder="Describe your requirements..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Posting...' : 'Post Tuition'}
                  </button>
                </form>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'Applications' && (
              <div className="text-center py-16">
                
                <p className="text-gray-500">No applications yet.</p>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'Payments' && (
              <div className="text-center py-16">
                
                <p className="text-gray-500">No past payment history found.</p>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'Profile' && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
                <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 text-2xl font-semibold">
                      {user?.displayName?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                    Change Photo
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500"
                    />
                  </div>

                  <button className="bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashBoard;