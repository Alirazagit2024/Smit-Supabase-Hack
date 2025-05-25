import "flowbite";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import { Dropdown } from "flowbite";
import { toast } from "react-toastify";
import ThemeToggle from "./ThemeToggle";

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

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-screen-xl border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse group"
          >
            <img
              loading="lazy"
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 transition-transform duration-300 group-hover:rotate-12"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-500">
              Logo
            </span>
          </Link>

          {/* Right Side Controls */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ThemeToggle />

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
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    Role: {currentRole || "guest"}
                  </span>
                </div>

                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleLinkClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                  {/* Show User Dashboard link for non-admin users */}
                  {currentRole !== "admin" && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-semibold"
                        onClick={handleLinkClick}
                      >
                        User Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleLinkClick}
                    >
                      Settings
                    </Link>
                  </li>
                  {/* Show Admin Panel link only for admin role */}
                  {currentRole === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white font-semibold"
                        onClick={handleLinkClick}
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
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

            {/* Mobile Menu Button */}
            <button
              data-collapse-toggle="navbar-user"
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-200"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`items-center justify-between ${
              isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {[

                // Show User Dashboard for non-admin users
                ...(currentRole !== "admin" ? [{ to: "/dashboard", label: "User Dashboard" }] : []),
                // Show Admin Panel for admin users
                ...(currentRole === "admin" ? [{ to: "/admin", label: "Admin Panel" }] : []),
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={handleLinkClick}
                    className={
                      `relative block px-3 py-2 rounded-md text-sm md:text-base transition-all duration-300 ` +
                      (isActive(item.to)
                        ? "text-orange-500 font-semibold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500 after:scale-x-100 after:transition-transform after:duration-300"
                        : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300")
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;