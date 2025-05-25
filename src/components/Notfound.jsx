import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div className="text-center max-w-md mx-auto">
      {/* Animated 404 Illustration */}
      <div className="mb-8 animate-bounce">
        <svg className="w-32 h-32 mx-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="#EF4444" strokeWidth="8" strokeDasharray="20 10" fill="white" />
          <text x="50%" y="50%" textAnchor="middle" fill="#EF4444" fontSize="60" dy=".3em" fontFamily="Arial" fontWeight="bold">404</text>
        </svg>
      </div>
  
      {/* Content */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! Lagta hai yeh page exist nahi karta.
      </p>
  
      {/* Action Button */}
      <button
        onClick={() => navigate("/home")}
        className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          Go Back Home
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </button>
  
      {/* Additional Help */}
      <p className="mt-8 text-sm text-gray-500">
        Ya phir aap <a href="/contact" className="text-blue-600 hover:underline">humse contact</a> kar sakte hain
      </p>
    </div>
  </div>
  );
};

export default NotFound;
