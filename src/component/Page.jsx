import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
          console.log("No user login found!");
        }
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
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        name: formData.name,
        email: formData.email,
      });
      setUserDetails(formData);
      setEditMode(false);
      alert("Profile updated successfully!");
    }
  };

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-2 border-gray-300 p-6 rounded-xl shadow-md w-80">
        <h2 className="text-teal-300 font-bold text-4xl text-center pb-4">
          PROFILE
        </h2>

        {userDetails ? (
          <>
            {!editMode ? (
              <>
                <h3 className="text-lg font-semibold">
                  Welcome {userDetails.name}
                </h3>
                <p>Email: {userDetails.email}</p>
                <p>Name: {userDetails.name}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </label>

                <label className="block mb-2">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                </label>

                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded-lg"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Page;
