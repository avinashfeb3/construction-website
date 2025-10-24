import React, { useState } from "react";
import DashboardLogo from "../../assets/images/dashlogo.png";
import ProfileImg from "../../assets/images/test-1.jpg";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-light border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center p-2">
        {/* Company Logo */}
        <div className="d-flex align-items-center">
          <img
            src={DashboardLogo}
            alt="Company Logo"
            className="me-4 mx-3 img-fluid"
            style={{
              height: "auto",
              width: "110px",
              maxHeight: "60px",
            }}
          />
        </div>

        {/* Profile Dropdown */}
        <div className="position-relative">
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={ProfileImg}
              alt="Profile"
              className="rounded-circle"
              style={{ height: "40px", width: "40px" }}
            />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div
              className="position-absolute end-0 mt-2 py-2 bg-white shadow rounded"
              style={{ minWidth: "150px", zIndex: 1000 }}
            >
              <span className="ms-3 mt-3 d-none d-md-block">John Doe</span>
              <a href="#" className="dropdown-item px-3 py-2">
                My Profile
              </a>
              <a href="#" className="dropdown-item px-3 py-2">
                Settings
              </a>
              <div className="dropdown-divider"></div>
              <a href="login" className="dropdown-item px-3 py-2 text-danger">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
