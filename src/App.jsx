import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Athlete from "./Pages/Athlete";
import Doctor from "./Pages/Doctor";
import Coach from "./Pages/Coach";
import SignUp from "./Pages/SignUp";
import AboutUs from "./Pages/AboutUs";
import LogIn from "./Pages/LogIn";
import Navbar from "./Pages/Navbar";
import { AuthProvider } from "./context/AuthContext"; // Fixed import

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/athlete" element={<Athlete />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<LogIn />} />
          
          
          
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;


