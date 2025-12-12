const Unauthorized = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
      <p className="text-gray-600">You are not allowed to access this page.</p>
    </div>
  );
};

export default Unauthorized;
