// src/components/AdminSidebar.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarCheck,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: <FaTachometerAlt />, key: "dashboard", path: "/admin-dashboard" },
    { label: "Manage Events", icon: <FaCalendarCheck />, key: "events", path: "/my-events" },
    { label: "Participants", icon: <FaUsers />, key: "participants", path: "/participants" },
  ];

  // Get active key based on current URL
  const getActiveKey = () => {
    const current = menu.find((item) => item.path === location.pathname);
    return current ? current.key : "";
  };

  const [active, setActive] = useState(getActiveKey());

  const handleClick = (item) => {
    setActive(item.key);
    navigate(item.path);
  };

  return (
    <div className="hidden sm:flex sm:flex-col h-screen w-64 bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => handleClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              active === item.key
                ? "bg-[#FF6900] text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
