import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import TutorsCard from "../../Components/TutorsCard/TutorsCard";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {

      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        
        const response = await fetch(`${apiUrl}/users/role/tutor`);
        if (response.ok) {


          const data = await response.json();
          setTutors(data);
        }
      } 
      
      catch (error) {
        console.error("Error fetching tutors:", error);
      }
      
      finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  
  const filteredTutors = tutors.filter(tutor => 
    tutor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Expert Tutors</h1>
        <p className="text-gray-600 mt-2">Find your perfect learning partner</p>
        
        
        <div className="mt-8 max-w-xl mx-auto relative">
          <input 
            type="text"
            placeholder="Search by name, subject, or location..."
            className="w-full pl-6 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTutors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map((tutor, index) => (
            <motion.div
              key={tutor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TutorsCard tutor={tutor} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          No tutors found matching your search.
        </div>
      )}
    </div>
  );
};

export default Tutors;