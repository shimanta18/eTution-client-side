import { useState } from 'react';
import useAuth from '../../hooks/useAuth';


const ApplicationModal = ({ tuition, onClose, onSuccess }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const[toast,setToast] = useEffect(null)
  const [formData, setFormData] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });

  const showToast=(message,type)=>{
    setToast({message,type})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const applicationData = {
        tuitionId: tuition._id,
        tutorId: user.uid,
        tutorName: user.displayName,
        tutorEmail: user.email,
        qualifications: formData.qualifications,
        experience: formData.experience,
        expectedSalary: parseFloat(formData.expectedSalary),
        status: 'PENDING',
        appliedAt: new Date().toISOString(),
        tuitionDetails: {
          subject: tuition.subject,
          classGrade: tuition.classGrade,
          studentName: tuition.studentName
        }
      };

      const response = await fetch(`${apiUrl}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData)
      });

      if (response.ok) {
        showToast("Application submitted successfully!")
       setTimeout(()=>{
        onSuccess()
        onClose()
       },1500)
      } 
      else {
        showToast(data.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast('Network error. Please check your connection and try again.', 'error');
    
    } 
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>

    {toast&&(
      <Toast></Toast>
    )}
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Apply for Tuition</h2>
              <p className="text-indigo-100 text-sm mt-1">
                {tuition.subject} - {tuition.classGrade}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition p-2 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Your Name
              </label>
              <div className="text-gray-900 font-medium">{user?.displayName || 'Not provided'}</div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="text-gray-900 font-medium truncate">{user?.email || 'Not provided'}</div>
            </div>
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Educational Qualifications <span className="text-red-500">*</span>
            </label>
            <textarea
              name="qualifications"
              required
              rows={3}
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="e.g., B.Sc. in Mathematics from Dhaka University, M.Sc. in progress..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Teaching Experience <span className="text-red-500">*</span>
            </label>
            <textarea
              name="experience"
              required
              rows={3}
              value={formData.experience}
              onChange={handleChange}
              placeholder="Describe your teaching experience, subjects you've taught, age groups, etc..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-none"
            />
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Expected Salary (Per Month) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                BDT
              </span>
              <input
                type="number"
                name="expectedSalary"
                required
                min="0"
                step="100"
                value={formData.expectedSalary}
                onChange={handleChange}
                placeholder="5000"
                className="w-full pl-16 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Student's budget: BDT {tuition.budget || 'Not specified'}/month
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default ApplicationModal;