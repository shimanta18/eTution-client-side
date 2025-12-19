import { Link } from 'react-router-dom';

const TutorsCard = ({ tutor }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      
      <div className="h-24 bg-gradient-to-r from-indigo-50 to-blue-50 relative">
       
        {tutor.verificationStatus === "Verified" && 
        (
          <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md flex items-center gap-1 shadow-sm border border-green-100">
            <span className="text-green-600">✔</span>
            <span className="text-[10px] font-bold text-green-700 uppercase">Verified</span>
          </div>
        )}
      </div>

      <div className="px-6 pb-6 flex-grow">
        <div className="relative -mt-10 mb-4">
          <img 
            src={tutor.photoURL || "https://ui-avatars.com/api/?name="+ tutor.name} 
            alt={tutor.name}
            className="w-20 h-20 rounded-2xl border-4 border-white object-cover shadow-sm bg-gray-100"
          />
        </div>

        <h3 className="text-xl font-bold text-gray-900">{tutor.name}</h3>
        <p className="text-indigo-600 text-sm font-medium mb-3">{tutor.subject || "General Educator"}</p>
        
        <div className="space-y-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Edu:</span> {tutor.qualifications || "Not specified"}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Exp:</span> {tutor.experience || "0"} Years
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Loc:</span> {tutor.location || "Dhaka"}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-400 font-medium">Rating: </span>
          <span className="text-yellow-500 font-bold">4.8 </span>
        </div>
        
        <Link 
          to={`/tutors/${tutor.uid || tutor._id}`} 
          className="text-indigo-600 font-bold text-sm hover:underline"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default TutorsCard;