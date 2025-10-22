import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from "../../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
const Header = () => {
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const changeValueOnScroll = () => {
      const scrollValue = document?.documentElement?.scrollTop || window.scrollY || 0;
      scrollValue > 100 ? setNav(true) : setNav(false);
    };

    window.addEventListener("scroll", changeValueOnScroll);
    changeValueOnScroll();
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);
  return (
    <>
      <header>
        <div className="container py-1">
          <Navbar  expand="lg" className={`${nav === true ? "sticky" : ""}`}>
            <Navbar.Brand>
              <Link to="/">
                <img src={logo} alt="Construction Logo" className="img-fluid" />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Services
                </Nav.Link>
                <Nav.Link as={Link} to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} to="/blogs" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Blogs
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                  Contact Us
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </>
  );
};

export default Header;
