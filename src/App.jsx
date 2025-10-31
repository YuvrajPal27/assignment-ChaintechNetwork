import Login from "./component/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./component/Register";
import Page from "./component/Page";
import { useEffect, useState } from "react";
import { auth } from "./component/firebase";

const App = () => {
  
  const [user, setUser] = useState(null);

  useEffect  (() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Page />} />
      </Routes>
    </Router>
  );
};

export default App;
