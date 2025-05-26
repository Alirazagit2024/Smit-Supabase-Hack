// src/components/UserSidebar.jsx
import { useState, useEffect } from "react";
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: <FaHome />, key: "dashboard", path: "/user-dashboard" },
    { label: "My Events", icon: <FaCalendarAlt />, key: "events", path: "/my-events" },
  ];

  // Set initial active key based on URL path
  const getActiveKey = () => {
    const current = menu.find((item) => item.path === location.pathname);
    return current ? current.key : "dashboard";
  };

  const [active, setActive] = useState(getActiveKey());

  // Update active state when route changes (optional if using navigate only)
  useEffect(() => {
    const activeKey = getActiveKey();
    setActive(activeKey);
  }, [location.pathname]);

  const handleMenuClick = (item) => {
    setActive(item.key);
    navigate(item.path);
  };

  return (
    <div className="hidden sm:flex sm:flex-col min-h-screen w-64 bg-gray-900 text-white p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">🎯 User Panel</h2>

      <ul className="space-y-4">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => handleMenuClick(item)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
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
