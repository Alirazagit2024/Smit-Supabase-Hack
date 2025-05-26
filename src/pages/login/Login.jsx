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
      // console.error(error);
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
      options: { redirectTo: "https://smit-supabase-hack.vercel.app" },
    });

    if (error) {
      toast.error(error.message || `${provider} login failed!`);
    } else {
      toast.success(`Welcome! ${provider} login successful.`);
    }
  };

  return (
    <div className="min-h-screen py-8 flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-gray-800 text-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mt-4">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="w-full bg-[#FF6900] hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>
          <button
            onClick={() => handleOAuthLogin("github")}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaGithub /> Continue with GitHub
          </button>
        </div>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart())}
              onBlur={(e) => setEmail(e.target.value.trim())}
              id="loginEmail"
              type="email"
              placeholder="aliraza@gmail.com"
              className="w-full px-4 py-2 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value.trimStart())}
                onBlur={(e) => setPassword(e.target.value.trim())}
                id="loginPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
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
            <Link to="/reset" className="text-sm text-orange-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6900] hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <div className="bg-gray-800 mt-3 p-4 rounded-xl border border-gray-600 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-400 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;