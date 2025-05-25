import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGithub, FaGoogle } from "react-icons/fa";
import supabase from "../../lib/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password: trimmedPassword,
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Login failed!");
    } else {
      toast.success("Login successful!");
      localStorage.setItem("login_user", data.session.access_token);
      navigate("/");
    }

    setEmail("");
    setPassword("");
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: "http://localhost:5173" },
    });

    if (error) {
      toast.error(error.message || `${provider} login failed!`);
    } else {
      toast.success(`Welcome! ${provider} login successful.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500 mt-1 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleForm} className="space-y-4">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider"
              >
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value.trimStart())}
                onBlur={(e) => setEmail(e.target.value.trim())}
                id="loginEmail"
                type="email"
                placeholder="aliraza@gmail.com"
                className="w-full text-black text-sm bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trimStart())}
                  onBlur={(e) => setPassword(e.target.value.trim())}
                  id="loginPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full text-black text-sm pr-10 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <AiOutlineEye className="text-lg" />
                  ) : (
                    <AiOutlineEyeInvisible className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/reset"
                className="text-xs text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Login
            </button>

            <div className="flex items-center gap-3 my-6">
              <hr className="flex-grow border-gray-200" />
              <span className="text-gray-400 text-xs font-medium">OR</span>
              <hr className="flex-grow border-gray-200" />
            </div>

            <button
              onClick={() => handleOAuthLogin("google")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              <FaGoogle className="text-lg" />
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin("github")}
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-700 transition-all"
            >
              <FaGithub className="text-lg" />
              Continue with GitHub
            </button>
          </form>
        </div>

        <div className="bg-white mt-3 p-4 rounded-xl border border-gray-200 text-center shadow-sm">
          <p className="text-xs text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
