import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ApplicationModal from '../../Components/Modals/ApplicationModal';
import useAuth from "../../hooks/useAuth";



const TuitionDetails = () => {
  const {id} = useParams()
   const { user } = useAuth();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hasApplied, setHasApplied] = useState(false)

  useEffect(()=>{
    fetchTuitionDetails();
    if (user) {
      checkIfApplied();
    }
  },
[id,user])

const fetchTuitionDetails =async()=>{
    try{
        const response = await fetch(`http://localhost:5000/api/tuitions/${id}`)

        if(response.ok){
            const data = await response.json()
            setTuition(data)
        }
    }
    catch(error){
        console.error('Error fetching tuition:', error)
    }

    finally{
        setLoading(false)
    }
}

const checkIfApplied=async()=>{
    try{
        const response= await fetch (`http://localhost:5000/api/applications/tutor/${user.uid}`);

        if(response.ok){
            const applications = await response.json()
            const applied = applications.some(app=> app.tuitionId===id)
            setHasApplied(applied)
        }
    }
    catch(error){
        console.error('Error checking application:', error)
    }
}

if(loading){
  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <p className="text-gray-500">Tuition not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <button
        onClick={() =>
            
            navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {tuition.subject} - {tuition.classGrade}
            </h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
            
            ${
              tuition.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              tuition.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {tuition.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Student</h3>
            <p className="text-lg text-gray-900">{tuition.studentName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
            <p className="text-lg text-gray-900"> {tuition.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Budget</h3>
            <p className="text-lg text-gray-900"> Bdt{tuition.budget}/month</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Posted</h3>
            <p className="text-lg text-gray-900">
              {new Date(tuition.postedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{tuition.description}</p>
        </div>

        {user && tuition.status === 'PENDING' 
        
        &&
         (
          <button
            onClick={() => setShowModal(true)}
            disabled={hasApplied}
            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {hasApplied ? 'Already Applied' : 'Apply for This Tuition'}
          </button>
        )}
      </div>

      {showModal && (
        <ApplicationModal
          tuition={tuition}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setHasApplied(true);
            fetchTuitionDetails();
          }}
        />
      )}
    </div>
  );
};
export default TuitionDetails
