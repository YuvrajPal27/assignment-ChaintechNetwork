import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch user details
  const fetchUserDetails = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserDetails(data);
          setFormData({ name: data.name || "", email: data.email || "" });
        } else {
          toast.error("⚠️ No user data found!", {
            position: "top-center",
            autoClose: 2000,
            theme: "dark",
          });
        }
      } else {
        toast.warning("🔒 Please log in first!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        window.location.href = "/login";
      }
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle input changes while editing
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Update Firestore document
  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "Users", user.uid);
        await updateDoc(userRef, {
          name: formData.name,
          email: formData.email,
        });
        setUserDetails(formData);
        setEditMode(false);
        toast.success("✅ Profile updated successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("❌ Failed to update profile. Try again.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  // Logout logic
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.info("👋 Logged out successfully!", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("❌ Error logging out.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="bg-gradient-to-tr from-black via-neutral-900 to-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="border border-white/10 w-full max-w-sm shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl p-6 text-gray-100">
        <h2 className="text-center text-gray-100 text-4xl font-semibold mb-6 tracking-wide">
          Profile
        </h2>

        {userDetails ? (
          <>
            {!editMode ? (
              <div className="space-y-3 text-gray-300">
                <h3 className="text-lg font-semibold">
                  Welcome,{" "}
                  <span className="text-gray-100 font-medium">
                    {userDetails.name}
                  </span>
                </h3>
                <p>
                  <span className="text-gray-400">Email:</span>{" "}
                  {userDetails.email}
                </p>
                <p>
                  <span className="text-gray-400">Name:</span>{" "}
                  {userDetails.name}
                </p>

                <div className="flex gap-3 mt-6">
                  <button
                    className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-gray-700/50"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-500 text-white py-2 rounded-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-md hover:shadow-red-600/50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-300 text-sm">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md transition-all"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-300 text-sm">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full bg-transparent border border-white/20 rounded-lg px-3 py-3 my-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md transition-all"
                  />
                </label>

                <div className="flex gap-3 mt-4">
                  <button
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-500 text-white py-2 rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 shadow-md hover:shadow-green-600/50"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="flex-1 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 py-2 rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all duration-300 shadow-md hover:shadow-gray-700/50"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400">Loading...</p>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Page;
