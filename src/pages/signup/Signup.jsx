import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import supabase from "../../lib/supabase";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password.trim(),
      options: {
        data: {
          display_name: username.trim(),
          role: 'user'
        },
      },
    });

    if (error) {
      toast.error(error.message || "Signup failed!");
    } else {
      toast.success("Signup successful! Please log in.");
      navigate("/login");
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });
    if (error) toast.error(error.message || "Google login failed!");
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173",
      },
    });
    if (error) toast.error(error.message || "GitHub login failed!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center shadow">
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571M5.807 18.531A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3M13.679 20.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mt-4">Join Our Community</h2>
          <p className="text-gray-500 text-sm">Create your account in seconds</p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FaGithub /> Continue with GitHub
          </button>
        </div>

        <div className="flex items-center mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trimStart())}
              onBlur={(e) => setUsername(e.target.value.trim())}
              placeholder="Ali Raza"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart())}
              onBlur={(e) => setEmail(e.target.value.trim())}
              placeholder="aliraza@example.com"
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value.trimStart())}
                onBlur={(e) => setPassword(e.target.value.trim())}
                placeholder="••••••••"
                className="w-full px-4 py-2 pr-10 rounded border focus:outline-none focus:ring focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </div>
          {/* <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded border focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
