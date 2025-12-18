
const TuitionCard = () => {
 return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
      
      {/* Subject Badge */}
      <span className="inline-block mb-3 px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
        {tuition.subject.toUpperCase()}


      </span>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-1">
        {tuition.classGrade}
      </h2>



      {/* Location */}
      <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
         {tuition.location}
      </p>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 line-clamp-2">
        {tuition.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-green-600 font-semibold">
          Bdt {tuition.budget}/mo
        </span>

        <Link
          to={`/tuitions/${tuition._id}`}
    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md
    
    hover:bg-indigo-700 transition"
        >
        Details & Apply
        </Link>
      </div>
    </div>
  );
};


export default TuitionCard
