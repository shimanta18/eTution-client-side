import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TutorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchTutorProfile();
  }, [id]);

  const fetchTutorProfile = async () => {
    try {
      const baseUri = apiUrl.endsWith('/api') ? apiUrl : `${apiUrl}/api`;
      const response = await fetch(`${baseUri}/users/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTutor(data);
      }
      
      else {
        console.error('Failed to fetch tutor profile. Status:', response.status);
      }
    } 
    
    catch (error) {
      console.error('Error fetching tutor:', error);
    } finally {
      setLoading(false);
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
        <p className="text-gray-500">Tutor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <img 
                src={tutor.photoURL 
                    
                    || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}`}
                alt={tutor.name}
                className="w-32 h-32 rounded-2xl border-4 border-white object-cover shadow-lg bg-gray-100"
              />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.name}</h1>
                <p className="text-indigo-600 text-lg font-medium mb-4">
                  {tutor.subject || "General Educator"}
                </p>
              </div>
              
              <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                Contact Tutor
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Qualifications</p>
                <p className="font-semibold text-gray-900">
                  {tutor.qualifications || "Not specified"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Experience</p>
                <p className="font-semibold text-gray-900">
                  {tutor.experience || "0"} Years
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-semibold text-gray-900">
                  {tutor.location || "Available Online"}
                </p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
<p className="text-gray-700 leading-relaxed">
            Experienced {tutor.subject || "educator"} with {tutor.experience || "several"}
            
             years of teaching experience. 
            Specialized in helping students achieve their academic goals through personalized teaching methods.
          </p>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3">Expertise</h3>
            <div className="flex flex-wrap gap-2">
              {tutor.subject && (
                <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  {tutor.subject}
                </span>
              )}
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Online Teaching
              </span>
              <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">Home Tutoring
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;