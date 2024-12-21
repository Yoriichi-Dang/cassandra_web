// components/Spinner.js
const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0B192C] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
