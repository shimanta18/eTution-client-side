import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";



const TutorDashboard = () => {
  const { user, logOut } = useAuth();

  const navigate = useNavigate();
const API_BASE = import.meta.env.VITE_API_URL;

  const [activeTab, setActiveTab] = useState('Available Tuitions');
  const [availableTuitions, setAvailableTuitions] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [myStudents, setMyStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = ['Available Tuitions', 'My Applications', 'My Students', 'Earnings', 'Profile'];

  const [profileData, setProfileData] = useState({
  subject: '',
  experience: '',
  qualifications: '',
  location: ''
});

const [earningsData, setEarningsData] = useState({
  thisMonth: 0,
  lastMonth: 0,
  totalEarned: 0,
  transactions: []
});


const fetchEarnings = async () => {
  if (!user) return;
  try {
    const response = await fetch(`${apiUrl}/api/earnings/tutor/${user.uid}`);
    if (response.ok) {
      const data = await response.json();
      setEarningsData(data);
    }
  }
  
  catch (error) {
    console.error('Error fetching earnings:', error);
  }
};


 useEffect(() => {
  if (activeTab === 'Available Tuitions') {
    fetchAvailableTuitions();
  } 
  
  else if (activeTab === 'My Applications') {
    fetchMyApplications();
  } 

  else if (activeTab === 'Earnings') {
    fetchEarnings();
  }
  
  else if (activeTab === 'My Students') {
    fetchMyStudents();
  } 
  else if (activeTab === 'Profile' && user?.uid) {
    
    fetch(`${apiUrl}/api/users/id/${user.uid}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        return res.json();
      })
      .then(data => {
        console.log(' Profile data loaded:', data); 
        setProfileData({
          subject: data.subject || '',
          experience: data.experience || '',
          qualifications: data.qualifications || '',
          location: data.location || ''
        });
      })
      .catch(error => {
        console.error(' Error loading profile:', error);
      });
  }
}, [activeTab, user]);




const handleUpdateProfile = async (e) => {
  e.preventDefault();
  
  console.log(' Updating profile with:', profileData); 
  
  try {
    const response = await fetch(`${apiUrl}/api/users/update/${user.uid}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(profileData)
    });

    const data = await response.json();
    console.log(' Update response:', data); 

    if (response.ok) {
      alert(' Profile updated successfully!');
     
      const refreshResponse = await fetch(`${apiUrl}/api/tuitions/available`);
      if (refreshResponse.ok) {


        const refreshedData = await refreshResponse.json();
        setProfileData({


          subject: refreshedData.subject || '',
          experience: refreshedData.experience || '',
          qualifications: refreshedData.qualifications || '',
          location: refreshedData.location || ''
        });
      }
    } else {
      alert(' Failed to update profile: ' + data.message);
    }
  } catch (error) {
    console.error(" Update error:", error);
    alert('Error updating profile');
  }
};

  const fetchAvailableTuitions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/applications/tutor/${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setAvailableTuitions(data);
      }
    }
    
    catch (error) {
      console.error('Error fetching tuitions:', error);
    }
    
    finally {
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/applications`);
      if (response.ok) {
        const data = await response.json();
        setMyApplications(data);
      }
    }
    
    catch (error) {
      console.error('Error fetching applications:', error);
    }
    
    finally {
      setLoading(false);
    }
  };

  const fetchMyStudents = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students/tutor/${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        setMyStudents(data);
      }
    } 
    
    catch (error) {
      console.error('Error fetching students:', error);
    } 
    
    finally {
      setLoading(false);
    }
  };

  const handleApplyToTuition = async (tuitionId) => {
    if (!user) return;

    try {
      const applicationData = {
        tuitionId,
        tutorId: user.uid,
        tutorName: user.displayName,
        tutorEmail: user.email,
        status: 'PENDING',
        appliedAt: new Date().toISOString()
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        fetchAvailableTuitions();
      }
      
      else {
        alert('Failed to submit application');
      }
    }
    
    
    catch (error) {
      console.error('Error applying to tuition:', error);
      alert('Error submitting application');
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
          
          <span className="text-lg font-semibold text-gray-900">eTuitionBd</span>
        </div>

        {/* Profile Section */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'T'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.displayName || 'Tutor'}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Tutor</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
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
              <h1 className="text-xl font-semibold text-gray-900">Tutor Dashboard</h1>
              
              <div className="flex items-center gap-3">
               
              </div>
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
                      ? 'border-green-600 text-green-600'
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

            {/* Available Tuitions Tab */}
            {activeTab === 'Available Tuitions' && (
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : availableTuitions.length > 0 ? (
                  availableTuitions.map((tuition) => (
                    <div 
                      key={tuition._id} 
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-base font-semibold text-gray-900">
                              {tuition.subject} - {tuition.classGrade}
                            </h3>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              New
                            </span>
                          </div>
                          <div className="space-y-1 mb-3">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Student:</span> {tuition.studentName}
                            </p>
                            <p className="text-sm text-gray-600"> {tuition.location}</p>
                            <p className="text-sm text-gray-600"> Budget: Bdt{tuition.budget}/month</p>
                          </div>
                          <p className="text-sm text-gray-700">{tuition.description}</p>
                        </div>
                        
                        <button
                          onClick={() => handleApplyToTuition(tuition._id)}
                          className="ml-4 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-gray-500">No tuitions available at the moment.</p>
                  </div>
                )}
              </div>
            )}

            {/* My Applications Tab */}
            {activeTab === 'My Applications' 
            &&
             (
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : myApplications.length > 0 ? (
                  myApplications.map((application) => (
                    <div 
                      key={application._id} 
                      className="bg-white border border-gray-200 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {application.tuitionDetails?.subject} - {application.tuitionDetails?.classGrade}
                          </h3>
                          <p className={`text-xs font-medium mb-2 ${
                            application.status === 'ACCEPTED' ? 'text-green-600' :
                            application.status === 'PENDING' ? 'text-orange-500' :
                            'text-red-600'
                          }`}>
                            Status: {application.status}
                          </p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              Applied: {new Date(application.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-gray-500">No applications yet. 
                      Start applying to available tuitions!</p>
                  </div>
                )}
              </div>
            )}

            {/* My Students Tab */}
            {activeTab === 'My Students' 
            &&
            
            (
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : myStudents.length > 0 ? (
                  myStudents.map((student) => (
                    <div 
                      key={student._id} 
                      className="bg-white border border-gray-200 rounded-lg p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900 mb-1">
                            {student.name}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Subject:</span> {student.subject}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Class:</span> {student.classGrade}
                            </p>
                            <p className="text-sm text-green-600 font-medium">Status: ACTIVE</p>
                          </div>
                        </div>
                        
                        <button className="px-4 py-2 text-green-600 border border-green-600 text-sm font-medium rounded-lg hover:bg-green-50 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4"></div>
                    <p className="text-gray-500">No students yet. Your accepted applications will appear here.</p>
                  </div>
                )}
              </div>
            )}
<main className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
       
          {activeTab === 'Earnings' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-3xl font-bold text-green-600">Bdt{earningsData.thisMonth}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-sm text-gray-600 mb-1">Last Month</p>
                  <p className="text-3xl font-bold text-blue-600">Bdt{earningsData.lastMonth}</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-5">
                  <p className="text-sm text-gray-600 mb-1">Total Earned</p>
                  <p className="text-3xl font-bold text-purple-600">Bdt{earningsData.totalEarned}</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {earningsData?.transactions?.length > 0 ? (
  earningsData.transactions.map((tx, idx) => (
    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100">
       
    </div>
  ))
) : (
  <p className="text-gray-500 text-sm">No recent transactions found.</p>
)}
                </div>
              </div>
            </div>
          )}
          
          
        </div>
      </main>

          {/* Profile Tab */}
{activeTab === 'Profile' && (
  <form onSubmit={handleUpdateProfile} className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialization (Subject)</label>
        <input
          type="text"
          value={profileData.subject}
          onChange={(e) => setProfileData({...profileData, subject: e.target.value})}
          placeholder="e.g., Mathematics"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Qualifications</label>
        <input
          type="text"
          value={profileData.qualifications}
          onChange={(e) => setProfileData({...profileData, qualifications: e.target.value})}
          placeholder="e.g., B.Sc in Physics"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience (Years)</label>
        <input
          type="number"
          value={profileData.experience}
          onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
        <input
          type="text"
          value={profileData.location}
          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
          placeholder="e.g., Dhaka, Bangladesh"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors">
        Save Changes
      </button>
    </div>
  </form>
)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorDashboard;