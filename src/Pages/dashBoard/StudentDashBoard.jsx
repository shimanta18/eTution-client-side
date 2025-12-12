const StudentDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>

      <div className="space-y-4">
        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">My Tuitions</h2>
          <p>Your approved tuition list will appear here.</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Post New Tuition</h2>
          <p>Form to create a new tuition request.</p>
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold">Payments</h2>
          <p>All your payments/transactions.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
