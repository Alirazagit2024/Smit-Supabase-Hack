import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../lib/supabase";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid reset link");
    }
  }, [accessToken]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const trimmedNewPassword = newPassword.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedNewPassword === "" || trimmedConfirmPassword === "") {
      setError("Please fill in both password fields.");
      return;
    }

    if (trimmedNewPassword !== trimmedConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: trimmedNewPassword,
        access_token: accessToken,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        setMessage("");
      } else {
        setMessage("Password updated successfully! Redirecting to login...");
        toast.success("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError("An error occurred while updating your password");
      toast.error("An error occurred while updating your password");
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          {/* Main Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Reset Your Password
              </h1>
              <p className="text-gray-500 mt-2 text-sm">
                Enter a new password below to update your account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handlePasswordUpdate}>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value.trimStart())}
                    onBlur={(e) => setNewPassword(e.target.value.trim())}
                    placeholder="Enter your new password"
                    className="w-full text-black text-sm pr-10 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleNewPassword}
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNewPassword ? (
                      <AiOutlineEye className="text-lg" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value.trimStart())
                    }
                    onBlur={(e) => setConfirmPassword(e.target.value.trim())}
                    placeholder="Confirm your new password"
                    className="w-full text-black text-sm pr-10 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPassword}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEye className="text-lg" />
                    ) : (
                      <AiOutlineEyeInvisible className="text-lg" />
                    )}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={`text-center text-sm p-2 rounded-lg ${
                    message.includes("success")
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="w-full cursor-pointer transition-all duration-200 hover:bg-blue-700 bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePassword;
