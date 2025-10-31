import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }

      toast.success("✅ Account created successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Error creating user or saving data:", error);

      let errorMessage = "❌ Registration failed. Try again.";
      if (error.code === "auth/email-already-in-use")
        errorMessage = "⚠️ Email already in use!";
      else if (error.code === "auth/weak-password")
        errorMessage = "⚠️ Password should be at least 6 characters.";
      else if (error.code === "auth/invalid-email")
        errorMessage = "⚠️ Invalid email format.";

      toast.error(errorMessage, {
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
          Register
        </h3>

        <form onSubmit={handleRegister}>
          <label className="block my-4 text-gray-300">
            <span className="text-sm">Full Name</span>
            <input
              type="text"
              placeholder="Enter your full name"
              className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition-all"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block my-4 text-gray-300">
            <span className="text-sm">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="block my-4 text-gray-300">
            <span className="text-sm">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-md transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-gray-700 to-gray-600 text-gray-100 text-xl py-2 my-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-gray-700/50"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-gray-300 font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Register;
