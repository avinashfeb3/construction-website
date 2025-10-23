import React, {useState,useEffect}from "react";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
const Footer = () => {
   // Scroll State
  const [isVisible, setIsVisible] = useState(false);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
  });
  return (
    <>
      <footer>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 mb-3">
              <h3>UrbanScape Builders</h3>
              <p>
                Our post-construction services gives you peace of mind knowing
                that we are still here for you even after.
              </p>
            </div>
            <div className="col-md-3 mb-3">
              <h3>Our Services</h3>
              <ul>
                <li><Link to="#">Specialty Construction</Link></li>
                <li><Link to="#">Civil Construction</Link></li>
                <li><Link to="#">Residential Construction</Link></li>
                <li><Link to="#">Corporate Construction</Link></li>
                <li><Link to="#">Building Construction</Link></li>
                <li><Link to="#">Industrial Construction</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="#">Home</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Services</Link></li>
                <li><Link to="#">Projects</Link></li>
                <li><Link to="#">Blog</Link></li>
                <li><Link to="#">contact Us</Link></li>
              </ul>
            </div>
            <div className="col-md-3 mb-3">
              <h3>Contact Us</h3>
                <ul>
                  <li>Address: 5505 Waterford District Dr, Miami, FL 33126 United States</li>
                  <li><Link to="tel:1234567890">Phone: 123-456-7890</Link></li>
                  <li>Email: info@urbanscape.com</li>
                </ul>
            </div>
            <hr/>
             <div className="text-center mt-3">
              <p>Copyright &copy; {new Date().getFullYear()} <span>Developed & Designed By Avinash Singh</span> | All rights reserved | Terms & Conditions | Privacy Policy</p>
            </div>
            </div>
        </div>
      </footer>
         {/* Sroll To Top */}
      {isVisible && (
        <div className="scroll_top" onClick={scrollTop}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
};

export default Footer;
