// src/components/AdminSidebar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard", path: "/admin-dashboard" },
    { label: "Manage Events", icon: <FaCalendarCheck />, key: "events", path: "/my-events" },
    { label: "Participants", icon: <FaUsers />, key: "participants", path: "/participants" },
  ];

  const handleClick = (item) => {
    setActive(item.key);
    if (item.key === "logout") {
      // Add your logout logic here
      console.log("Logging out...");
      // Example:
      // await supabase.auth.signOut();
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              active === item.key
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {item.key !== "logout" ? (
              <Link
                to={item.path}
                className="flex items-center gap-3 w-full"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 w-full">
                {item.icon}
                <span>{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
