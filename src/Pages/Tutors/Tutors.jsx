import { useEffect, useState } from "react";
import TutorsCard from "../../Components/TutorsCard/TutorsCard";



const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        
        const response = await fetch('http://localhost:5000/api/users/role/tutor');
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
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Our Expert Tutors</h1>
        <p className="text-gray-600 mt-2">Browse through our verified educators</p>
        
        <div className="mt-8 max-w-xl mx-auto relative">
          <input 
            type="text"
            placeholder="Search by name, subject, or qualification..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      ) :
       (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutors.map(tutor => (
            <TutorsCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;