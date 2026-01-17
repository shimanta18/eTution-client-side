import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationModal from "../../Components/Modals/ApplicationModal";
import useAuth from "../../hooks/useAuth";

console.log("useAuth imported:", useAuth);
const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);

  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    load();
  }, [id, user]);

  const load = async () => {
    try {
     
      const response1 = await fetch(`${apiUrl}/api/tuitions/${id}`);
      const data = await response1.json();
      setTuition(data);

      if (user) {
    
        const response2 = await fetch(`${apiUrl}/api/applications/tutor/${user.uid}`);
        const apps = await response2.json();
        setApplied(apps.some(a => a.tuitionId === id));
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

 
  if (!tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 text-gray-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg font-medium mb-4">Tuition not found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:underline font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header with Subject Badge */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-6">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              {tuition.subject}
            </span>
          </div>

          {/* Content */}
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tuition.subject} - {tuition.classGrade}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {tuition.location || "Location not specified"}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-green-600">
                  BDT {tuition.budget || "Negotiable"}/month
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {tuition.description || "No description provided"}
              </p>
            </div>

            {user && tuition.status === "PENDING" && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  disabled={applied}
                  onClick={() => setOpen(true)}
                  className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {applied ? "Already Applied" : "Apply for this Tuition"}
                </button>
                {applied && (
                  <p className="text-gray-500 text-sm mt-2">
                    You have already applied for this tuition
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {open && (
        <ApplicationModal
          tuition={tuition}
          onClose={() => setOpen(false)}
          onSuccess={load}
        />
      )}
    </div>
  );
};

export default TuitionDetails;