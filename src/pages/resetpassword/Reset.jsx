import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase";
import { toast } from "react-toastify";

function Reset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    setEmail("");

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      trimmedEmail,
      {
        redirectTo: "https://smit-supabase-hack.vercel.app/update-password",
      }
    );

    if (error) {
      setError(error.message);
      toast.error(error.message);
      setMessage("");
    } else {
      setMessage("Reset link sent! Please check your email.");
      toast.success("Reset your email successful.");
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-[#FF6900] text-white rounded-full flex items-center justify-center shadow-md">
            <svg
              className="h-8 w-8"
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
          <h1 className="text-2xl font-bold mt-4">Reset Your Password</h1>
          <p className="text-gray-400 text-sm mt-2">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handlePasswordReset}>
          <div>
            <label
              htmlFor="resetEmail"
              className="block text-sm text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="resetEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart())}
              onBlur={(e) => setEmail(e.target.value.trim())}
              placeholder="aliraza@gmail.com"
              className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            id="resetBtn"
            className="w-full bg-[#FF6900] hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
          >
            Send Reset Link
          </button>

          {/* Divider */}
          <div className="flex items-center mb-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <div className="text-center">
            <Link
              to="/"
              className="w-full bg-[#FF6900] hover:bg-orange-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
            >
              Create New Account
            </Link>
          </div>
        </form>

        {/* Footer Card */}
        <div className="bg-gray-800 mt-3 p-4 rounded-xl border border-gray-600 text-center">
          <Link
            to="/login"
            className="text-sm text-orange-400 font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reset;