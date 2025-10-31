import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Login form layout
  return (
    <div className="bg-linear-to-r from-violet-600 to-indigo-400 min-h-screen flex items-center justify-center p-4">
      <div className="border-2 border-gray-300 w-full min-w-sm max-w-sm shadow-lg bg-white/90 rounded-md p-4 ">
        <h3 className="text-center text-gray-700 text-4xl font-semibold">
          LogIn
        </h3>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Login Form */}
          <label className="block my-4">
            <span> Email:</span>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="block w-full border-2 border-gray-400 rounded-lg px-2 py-3 my-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-md"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>

          <label className="block mb-4">
            <span> Password:</span>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="block w-full border-2 border-gray-400 rounded-lg px-2 py-3 my-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-md"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>

          {/* Submit Button  */}
          <button className="w-full bg-indigo-500 text-white text-xl py-2 my-2 rounded-md hover:bg-indigo-600 transition-shadow shadow-md hover:shadow-lg ">
            LogIn
          </button>
        </form>

        {/* Redirect to Registration Page */}
        <p className="text-sm text-center text-gray-600 mt-4">
          <button
            // onClick={toggleForm}
            type="button"
            className="text-indigo-600 font-medium hover:underline"
          >
            <p className="text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
