// src/pages/admin/AdminDashboard.jsx

import React from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function AdminDashboard() {
  // Static demo data - replace with Supabase data
  const stats = [
    {
      title: "Total Events",
      value: 25,
      icon: <FaCalendarAlt className="text-blue-600 text-3xl" />,
    },
    {
      title: "Approved Events",
      value: 18,
      icon: <FaCheckCircle className="text-green-600 text-3xl" />,
    },
    {
      title: "Pending Events",
      value: 7,
      icon: <FaClock className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Participants",
      value: 130,
      icon: <FaUsers className="text-purple-600 text-3xl" />,
    },
  ];

  return (
    <div className="flex">

      {/* Dashboard Content */}
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 flex items-center gap-4"
            >
              <div className="bg-gray-100 rounded-full p-3">{item.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl text-black font-bold">{item.value}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
