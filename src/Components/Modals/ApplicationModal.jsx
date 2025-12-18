
const ApplicationModal = ({ tuition, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    qualifications: '',
    experience: '',
    expectedSalary: ''
  });
  const handleSubmit= async(e)=>{
 e.preventDefault();
    setLoading(true);

    try{
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
    }

    const response= await fetch('http://localhost:5000/api/applications',{
        method:'POST',
headers:{
    'Content-Type':'application/json',

},

body:JSON.stringify(applicationData)
    })

    if(response.ok){
        alert('Application submitted successfully!')
        onSuccess()
        onClose()
    }

    else{
        const error = await response.json();
        alert(error.error || 'Failed to submit application')
        
    }
  }

  catch(error){
     console.error('Error submitting application:', error);
      alert('Error submitting application');
  }

  finally{
    setLoading(false);
  }
}

const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Apply for Tuition</h2>
          <button


            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >


            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
<label className="block text-sm font-medium text-gray-700 mb-1">Name (read-only)
            </label>
    <input
    type="text"
        value={user?.displayName || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (read-only)
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          <div>
 <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications *
            </label>
    <textarea
       name="qualifications"
   required
              rows="3"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="e.g., M.Sc. in Mathematics, B.Ed."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience *
            </label>
    <textarea
    name="experience"
              required
              rows="3"
              value={formData.experience}
        onChange={handleChange}
              placeholder="Describe your teaching experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1"> Expected Salary (Bdt/month) *
            </label>
 <input
  type="number"
    name="expectedSalary"
     required
      value={formData.expectedSalary}
        onChange={handleChange}
        placeholder="e.g., 5000"
     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
    type="submit"
    disabled={loading}
    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ApplicationModal
