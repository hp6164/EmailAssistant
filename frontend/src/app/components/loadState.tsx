
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        <div className="w-20 h-20 border-green-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-primary border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
      <div className="ml-4 text-xl font-semibold text-primary">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;