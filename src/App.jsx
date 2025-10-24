import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Frontend/pages/Home/Home";
import About from "./components/Frontend/pages/About/About";
import Services from "./components/Frontend/pages/Services/Services";
import Projects from "./components/Frontend/pages/Projects/Projects";
import Blogs from "./components/Frontend/pages/Blogs/Blogs";
import Contact from "./components/Frontend/pages/Contact/Contact";
import Login from "./components/backend/Login";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/backend/Dashboard";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
