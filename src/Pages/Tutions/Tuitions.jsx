import { useEffect, useState } from "react";
import TuitionCard from "../../Components/TuitionCard";


const Tuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadTuitions();
  }, []);

  const loadTuitions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/tuitions/available`);
      const data = await response.json();
      setTuitions(data);
    }
     catch (err) {
      console.error(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  const filtered = tuitions.filter(t =>
    filter === "all" ? true : t.status === filter.toUpperCase()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Filters filter={filter} setFilter={setFilter} />

      <div className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <Spinner />
        ) : filtered.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(t => (
              <TuitionCard key={t._id} tuition={t} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default Tuitions;
