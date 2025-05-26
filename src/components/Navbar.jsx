import "flowbite";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { Dropdown } from "flowbite";
import { toast } from "react-toastify";
import { FaHome, FaTachometerAlt, FaCalendarCheck, FaUsers } from "react-icons/fa";
// import ThemeToggle from "./ThemeToggle"; // Uncomment if you want the theme toggle

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const [currentUser, setCurrentUser] = useState("Guest");
  const [currentEmail, setCurrentEmail] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [currentRole, setCurrentRole] = useState(null); // Role state

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Logout failed: " + error.message);
    } else {
      localStorage.removeItem("login_user");
      setCurrentUser(null);
      setCurrentEmail(null);
      setCurrentAvatar(null);
      setCurrentRole(null);
      toast.success("Logged out successfully!");
      navigate("/login");
    }
  };

  useEffect(() => {
    async function getUserDataAndInitDropdown() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user) {
        const displayName =
          user.user_metadata?.display_name ||
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          "Guest";

        const avatarUrl = user.user_metadata?.avatar_url || "/Images/user.webp";

        const email = user.email || "No email found";

        // Assuming role is stored inside user_metadata.role
        const role = user.user_metadata?.role || "user"; // default to "user" if no role

        setCurrentUser(displayName);
        setCurrentAvatar(avatarUrl);
        setCurrentEmail(email);
        setCurrentRole(role);

        const $triggerEl = document.getElementById("user-menu-button");
        const $dropdownEl = document.getElementById("user-dropdown");

        if ($triggerEl && $dropdownEl) {
          new Dropdown($dropdownEl, $triggerEl);
        }
      } else {
        setCurrentUser(null);
        setCurrentAvatar(null);
        setCurrentEmail(null);
        setCurrentRole(null);
      }
    }

    getUserDataAndInitDropdown();
  }, []);

  // Links for dropdown based on role
  const adminLinks = [
    { label: "Dashboard", key: "dashboard", path: "/admin-dashboard" },
    { label: "Manage Events", key: "events", path: "/my-events" },
    { label: "Participants", key: "participants", path: "/participants" },
  ];

  const userLinks = [
    { label: "Dashboard", key: "dashboard", path: "/user-dashboard" },
    { label: "Manage Events", key: "events", path: "/my-events" },
  ];

  const linksToShow = currentRole === "admin" ? adminLinks : currentRole === "user" ? userLinks : [];

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-screen-xl border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse group"
          >
            <span className="hidden sm:flex self-center text-2xl font-semibold whitespace-nowrap text-orange-500">
              Events Management System
            </span>
            <span className="sm:hidden self-center text-2xl font-semibold whitespace-nowrap text-orange-500">
              Events Manage
            </span>
          </Link>

          {/* Right Side Controls */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* <ThemeToggle /> */}

            {/* User Dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex text-sm cursor-pointer bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  loading="lazy"
                  width="36"
                  height="36"
                  className="w-[36px] h-[36px] border border-white rounded-full"
                  src={currentAvatar || "/Images/user.webp"}
                  alt="user photo"
                />
              </button>

              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="flex text-sm text-gray-900 dark:text-white">
                    <span className="inline-block hand-wave mr-1">👋</span>{" "}
                    {currentUser ? currentUser.toUpperCase() : "USER"}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {currentEmail || "No Email"}
                  </span>
                </div>

                <ul className="py-2" aria-labelledby="user-menu-button">
                  {linksToShow.map(({ label, icon, key, path }) => (
                    <li key={key}>
                      <Link
                        onClick={handleLinkClick}
                        to={path}
                        className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white`}
                      >
                        <span className="">{icon}</span> {label}
                      </Link>
                    </li>
                  ))}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
