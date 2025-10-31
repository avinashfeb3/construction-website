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
import RequireAuth from "./components/common/RequireAuth";
import AdminServices from "./components/backend/AdminServices";
import AdminProjects from "./components/backend/AdminProjects";
import AdminArticles from "./components/backend/AdminArticles";
import AdminMembers from "./components/backend/AdminMembers";
import AdminServicesCreate from "./components/backend/AdminService/AdminServicesCreate";
import AdminServicesEdit from "./components/backend/AdminService/AdminServicesEdit";
import AdminProjectCreate from "./components/backend/AdminProject/AdminProjectCreate";
import AdminProjectEdit from "./components/backend/AdminProject/AdminProjectEdit";
import AdminArticlesCreate from "./components/backend/AdminArticles/AdminArticlesCreate";
import AdminArticleEdit from "./components/backend/AdminArticles/AdminArticleEdit";
import AdminTestimonials from "./components/backend/AdminTestimonials";
import AdminTestimonialsCreate from "./components/backend/AdminTestimonials/AdminTestimonialsCreate";
import AdminTestimonialsEdit from "./components/backend/AdminTestimonials/AdminTestimonialsEdit";
import AdminTeamMemberCreate from "./components/backend/AdminTeamMember/AdminTeamMemberCreate";
import AdminTeamMemberEdit from "./components/backend/AdminTeamMember/AdminTeamMemberEdit";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/members" element={<AdminMembers />} />

          {/* Services Routes */}
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/services/create" element={<AdminServicesCreate />} />
          <Route path="/admin/services/edit/:id" element={<AdminServicesEdit />} />

          {/* Project Routes */}
          <Route path="/admin/projects/create" element={<AdminProjectCreate />} />
          <Route path="/admin/projects/edit/:id" element={<AdminProjectEdit />} />

          {/* Article Routes */}
          <Route path="/admin/articles/create" element={<AdminArticlesCreate />} />
          <Route path="/admin/articles/edit/:id" element={<AdminArticleEdit />} />

          {/* Testimonials Routes */}
          <Route path="/admin/testimonials/create" element={<AdminTestimonialsCreate />} />
          <Route path="/admin/testimonials/edit/:id" element={<AdminTestimonialsEdit />} />

          {/* Team Member Routes */}
          <Route path="/admin/members/create" element={<AdminTeamMemberCreate />} />
          <Route path="/admin/members/edit/:id" element={<AdminTeamMemberEdit />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
