import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";

function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // toggle between lofin and registration forms
  const toggleForm = () => setIsLogin(!isLogin);

  // User Registration Logic
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }
      console.log("Success!");
    } catch (error) {
      console.error("Error creating user or saving data:", error);
    }
  };

  // registration form layout
  return (
    <div className="bg-linear-to-r from-violet-600 to-indigo-400 min-h-screen flex items-center justify-center p-4">
      <div className="border-2 border-gray-300 w-full min-w-sm max-w-sm shadow-lg bg-white/90 rounded-md p-4 ">
        <h3 className="text-center text-gray-700 text-4xl font-semibold">
          Register
        </h3>

        {/* Registration form */}
        <form onSubmit={handleRegister}>
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

          <label className="block my-4">
            <span> Full Name:</span>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              className="block w-full border-2 border-gray-400 rounded-lg px-2 py-3 my-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 shadow-md"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </label>

          {/* Registration Form Button */}
          <button className="w-full bg-indigo-500 text-white text-xl py-2 my-2 rounded-md hover:bg-indigo-600 transition-shadow shadow-md hover:shadow-lg ">
            Register
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          <button
            onClick={toggleForm}
            type="button"
            className="text-indigo-600 font-medium hover:underline"
          >
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-medium hover:underline"
              >
                Log In
              </Link>
            </p>
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
