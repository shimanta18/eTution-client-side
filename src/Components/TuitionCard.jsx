import { Link } from 'react-router-dom';


const TuitionCard = ({ tuition }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition flex flex-col h-full">
      
      
      <div>
        <span className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
          {tuition.subject.toUpperCase()}


        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-1">{tuition.classGrade}
      </h2>

      
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
        
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>{tuition.location}
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{tuition.description}
      </p>


      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Budget</span>
            <span className="text-green-600 font-bold">Bdt {tuition.budget}/mo
            </span>
        </div>



        <Link
          to={`/tuitions/${tuition._id}`}
  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md
   hover:bg-indigo-700 transition"
        >Details & Apply
        </Link>
      </div>
    </div>
  );
};

export default TuitionCard;