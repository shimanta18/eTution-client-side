
import { useEffect, useState } from "react";
import TuitionCard from "../../Components/TuitionCard";


const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); 
  useEffect(() => {
    
    
    fetchTuitions();
  }, 
  
  [filter]);

  const fetchTuitions = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/tuitions/all';
      
      if (filter === 'pending') {
        url = 'http://localhost:5000/api/tuitions/available';
      } 
      
      else if (filter === 'approved') {
       
       
        url = 'http://localhost:5000/api/tuitions/approved';
      }



      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTuitions(data);
      }


    } 
    
    catch (error) {
      console.error('Error fetching tuitions:', error);
    } 
    
    
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Tuitions
          </h1>


          <p className="text-gray-600">Find the perfect tuition opportunity for you
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'all'


                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >All Tuitions
          </button>
          <button


            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >Pending
          </button>
          <button


            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === 'approved'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >Approved
          </button>
        </div>
      </div>

      {/* Tuitions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : tuitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4"></div>
            <p className="text-gray-500">No tuitions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tuitions;
