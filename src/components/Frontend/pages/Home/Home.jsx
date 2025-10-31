import React from "react";
import Layout from "../../../layout";
import Buttons from "../../../common/Button";
import AboutCommon from "../../../common/AboutCommon";
import Icon1 from "../../../../assets/images/icon-1.svg";
import Icon2 from "../../../../assets/images/icon-2.svg";
import Icon3 from "../../../../assets/images/icon-3.svg";
import LatestServices from "../../../common/LatestServices";
import LatestProjects from "../../../common/LatestProjects";
import LatestArticles from "../../../common/LatestArticles";
import LatestTestimonials from "../../../common/LatestTestimonials";

const Home = () => {
  const handleContact = () => {};

  const handleViewProjects = () => {};  

  return (
    <>
      <Layout>
        {/* Banner Section Start */}
        <section className="section-1">
          <div className="hero d-flex align-items-center">
            <div className="container-fluid">
              <div className="text-center">
                <span>Welcome UrbanScape Builders</span>
                <h1>
                  Crafting dreams with <br /> precision and excellence
                </h1>
                <p>
                  We excel at transform visions into reality through outstanding
                  craftmanship and precise <br /> attention to detail. With
                  years of experience and a dedication to quality.
                </p>
                <Buttons
                  primaryText="Contact Now"
                  secondaryText="View Projects"
                  onPrimaryClick={handleContact}
                  onSecondaryClick={handleViewProjects}
                />
              </div>
            </div>
          </div>
        </section>
        {/* Banner Section End */}

        {/* About Us Section Start */}
        <AboutCommon/>
        {/* About Us Section End*/}
     
        {/* Our Services Section Start */}
        <LatestServices/>
        {/* Our Services Section End */}

        {/* Why Choose Us Section Start */}
        <section className="section-4 py-5">
          <div className="container py-5">
            <div className="section-header text-center">
              <span>Why Choose Us</span>
              <h2>Discover our wide variety of projects.</h2>
              <p>
                Created in close partnership with our clients and collaborators,
                this approach merges industry expertise, <br /> decades of
                experience, innovation, and flexibility to consistently deliver
                excellence.
              </p>
            </div>
            <div className="row pt-3">
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img
                      src={Icon1}
                      alt="Expertise Icon"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Mission</h3>
                  </div>
                  <p>
                    Our mission at UrbanScape Builders is to deliver exceptional
                    construction solutions with quality, reliability, and
                    innovative design.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img
                      src={Icon2}
                      alt="Expertise Icon"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Vision</h3>
                  </div>
                  <p>
                    Our vision at UrbanScape Builders is to shape sustainable
                    and enduring structures that inspire trust and excellence.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                  <div className="card-icon">
                    <img
                      src={Icon3}
                      alt="Expertise Icon"
                      className="img-fluid"
                    />
                  </div>
                  <div className="card-title mt-3">
                    <h3>Goal</h3>
                  </div>
                  <p>
                    Our goal at UrbanScape Builders is to exceed client
                    expectations by delivering projects with precision, quality,
                    and timely execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us Section End */}

        {/* Our Projects Section Start */}
         <LatestProjects/> 
        {/* Our Projects Section End */}

        {/* Testimonials Section Start */}
        <LatestTestimonials/>
        {/* Testimonials Section End */}

        {/* Articles & Blog Section Start */}
        <LatestArticles/>
        {/* Articles & Blog Section End */}
      </Layout>
    </>
  );
};

export default Home;
