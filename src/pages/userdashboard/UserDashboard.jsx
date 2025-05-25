import { useContext } from "react";
import { FaHome, FaCalendarAlt, FaUser } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sidebar Component
const Sidebar = () => {
  const menu = [
    { label: "Dashboard", icon: <FaHome /> },
    { label: "My Events", icon: <FaCalendarAlt /> },
    { label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">User Panel</h2>
      <ul className="space-y-4">
        {menu.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main Dashboard Component
const UserDashboard = () => {
  const { user, role, userName } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form"); // 👈 Navigate to form page
  };

  return (
    <div className="flex">


      {/* Main Content */}
      <div className="flex-1 text-black p-6">
        <h1 className="text-3xl font-bold">
          Hi {userName?.toUpperCase()} ({role}), Dashboard
        </h1>
        <p className="mt-4">Welcome to your dashboard!</p>

        {/* Create Form Button */}
        <button
          onClick={handleClick}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-lg shadow-md mt-6"
        >
          Create Form
        </button>

      </div>
    </div>
  );
};

export default UserDashboard;
