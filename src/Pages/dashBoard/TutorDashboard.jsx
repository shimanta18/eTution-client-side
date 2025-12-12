const TutorDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Tutor Dashboard</h1>

      <div className="space-y-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">My Applications</h2>
          <p>Your tuition application statuses will appear here.</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Ongoing Tuitions</h2>
          <p>All approved tuitions assigned to you.</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Revenue History</h2>
          <p>Your earnings & completed payments will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
