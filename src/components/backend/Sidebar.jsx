import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", link: "#", icon: MdOutlineDashboard },
    { name: "User", link: "#", icon: AiOutlineUser },
    { name: "Messages", link: "#", icon: FiMessageSquare },
    { name: "Analytics", link: "#", icon: TbReportAnalytics, margin: true },
    { name: "File Manager", link: "#", icon: FiFolder },
    { name: "Cart", link: "#", icon: FiShoppingCart },
    { name: "Saved", link: "#", icon: AiOutlineHeart, margin: true },
    { name: "Setting", link: "#", icon: RiSettings4Line },
  ];

  const [open, setOpen] = useState(false); // Sidebar collapsed by default
  const [hovered, setHovered] = useState(null);

  return (
    <div className="d-flex flex-column flex-shrink-0 bg-dark text-light" 
         style={{ width: open ? "220px" : "50px", minHeight: "100vh", transition: "width 0.3s" }}>
      
      {/* Hamburger / Close Icon */}
      <div
        className="d-flex justify-content-end p-2"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        {open ? <IoClose size={26} /> : <HiMenuAlt3 size={26} />}
      </div>

      {/* Menu items */}
      <ul className="nav nav-pills flex-column mb-auto px-2">
        {menus.map((menu, i) => (
          <li key={i} className={`nav-item ${menu.margin ? "mt-3" : "mt-1"}`} 
              onMouseEnter={() => setHovered(i)} 
              onMouseLeave={() => setHovered(null)}>
            <Link
              to={menu.link}
              className="nav-link d-flex align-items-center text-light rounded"
              style={{ gap: "10px", padding: "8px 10px", fontSize: "0.95rem", position: "relative" }}
            >
              {React.createElement(menu.icon, { size: "20" })}
              {open && <span>{menu.name}</span>}

              {/* Tooltip when collapsed */}
              {!open && (
                <span
                  className="position-absolute bg-white text-dark rounded shadow px-2 py-1"
                  style={{
                    left: "55px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    whiteSpace: "nowrap",
                    display: hovered === i ? "block" : "none",
                    zIndex: 1000,
                    fontSize: "0.9rem",
                  }}
                  role="tooltip"
                  aria-hidden={hovered === i ? "false" : "true"}
                >
                  {menu.name}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar
