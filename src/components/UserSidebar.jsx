// src/components/UserSidebar.jsx
import { useState } from "react";
import { FaHome, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/user-dashboard" },
    { label: "My Events", icon: <FaCalendarAlt />, key: "events", path: "/my-events" },
  ];

  const handleMenuClick = (item) => {
    setActive(item.key);
    navigate(item.path);
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">🎯 User Panel</h2>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => handleMenuClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              active === item.key
                ? "bg-blue-600 text-white"
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
