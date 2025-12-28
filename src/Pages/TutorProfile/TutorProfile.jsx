import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  
  
  const currentUser = { uid: "test-user-id" }; 

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTutorProfile();
  }, [id]);

  const fetchTutorProfile = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const cleanBaseUrl = apiUrl.replace(/\/api$/, ""); 
      const response = await fetch(`${cleanBaseUrl}/api/users/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        setTutor(data);
      } else {
        console.error('Server responded with 404. Path:', `${cleanBaseUrl}/api/users/${id}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!currentUser) {
      alert("Please login to apply.");
      return;
    }

    try {
      const cleanBaseUrl = apiUrl.replace(/\/api$/, ""); 
      const response = await fetch(`${cleanBaseUrl}/api/applications/tutor/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tutorId: id, 
          studentId: currentUser.uid,
          studentName: currentUser.displayName || "Student" 
        })
      });
      
      if (response.ok) {
        alert("Application sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to apply"}`);
      }
    } catch (error) {
      console.error("Apply error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-gray-500 font-semibold">Tutor Profile Not Found</p>
        <p className="text-sm text-gray-400 mt-2">Checking path: {apiUrl}/api/users/{id}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <img src={tutor.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}`} alt={tutor.name} className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg bg-gray-100" />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                <p className="text-indigo-600 text-lg font-medium mb-4">{tutor.subject || "General Educator"}</p>
              </div>
              <button 
                onClick={handleApply} 
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Apply Now
              </button>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;