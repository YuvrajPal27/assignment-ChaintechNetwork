import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Logged in successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.href = "/profile";
      }, 2000);
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("❌ Invalid email or password", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-linear-to-tr from-black via-neutral-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="border border-white/10 w-full max-w-sm shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl p-6 text-gray-100">
        <h3 className="text-center text-gray-100 text-4xl font-semibold mb-4 tracking-wide">
          LogIn
        </h3>

        <form onSubmit={handleSubmit}>
          <label className="block my-4">
            <span>Email:</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block mb-4">
            <span>Password:</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-gray-700 to-gray-600 text-gray-100 text-xl py-2 my-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-gray-700/50"
          >
            LogIn
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          No account?{" "}
          <Link
            to="/register"
            className="text-gray-300 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
