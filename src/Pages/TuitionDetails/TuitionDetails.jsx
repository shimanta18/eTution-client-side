import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ApplicationModal from "../../Components/Modals/ApplicationModal";
import useAuth from "../../hooks/useAuth";

const TuitionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    load();
  }, [id, user]);

  const load = async () => {
    try {
      const response1 = await fetch(`${apiUrl}/api/tuitions/${id}`);
      const data = await response1.json();
      setTuition(data);

      if (user) {
        const apps = await apiFetch(`/api/applications/tutor/${user.uid}`);
        setApplied(apps.some(a => a.tuitionId === id));
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!tuition) return <Empty message="Tuition not found" />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-gray-600">
        ← Back
      </button>

      <h1 className="text-2xl font-bold">
        {tuition.subject} - {tuition.classGrade}
      </h1>

      <p className="mt-4">{tuition.description}</p>

      {user && tuition.status === "PENDING" && (
        <button
          disabled={applied}
          onClick={() => setOpen(true)}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
        >
          {applied ? "Already Applied" : "Apply"}
        </button>
      )}

      {open && (
        <ApplicationModal
          tuition={tuition}
          onClose={() => setOpen(false)}
          onSuccess={load}
        />
      )}
    </div>
  );
};

export default TuitionDetails;
