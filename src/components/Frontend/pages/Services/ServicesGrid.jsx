import React from 'react';
import ServiceImg from "../../../../assets/images/construction2.jpg";
import BuildingImg from "../../../../assets/images/construction4.jpg";
import ResidentialImg from "../../../../assets/images/construction7.jpg";
import CoporateImg from "../../../../assets/images/construction6.jpg";
import SpecialtyImg from "../../../../assets/images/construction13.jpg";
import CivilImg from "../../../../assets/images/construction121.jpg";
import { Link } from 'react-router-dom';
const ServicesGrid = () => {
  return (
    <>
         {/* Our Services Section Start */}
        <section className="section-3 bg-light py-3">
          <div className="container py-3">
            <div className="section-header text-center">
              <span>our services</span>
              <h2>Our Construction Services</h2>
              <p>
                We offer a diverse array of construction services, spanning
                residential, commercial, and industrial projects.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-4 col-lg-">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={ServiceImg}
                      alt="Service Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Industrial Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                        We provide reliable and efficient industrial
                        construction services tailored to meet the needs of
                        modern infrastructure projects.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={BuildingImg}
                      alt="Service Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Building Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                        We provide reliable and high-quality building
                        construction services, delivering projects with
                        precision, safety, and excellence.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={ResidentialImg}
                      alt="Service Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Residential Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                        We provide expert residential construction services,
                        building quality homes with precision, durability, and
                        modern design.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={CoporateImg}
                      alt="Service Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Coporate Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                        Corporate Construction Services delivers innovative,
                        reliable, and high-quality building solutions for modern
                        businesses.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="col-md-4 col-lg-4">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={SpecialtyImg}
                      alt="Specialty Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Specialty Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                       Our specialty construction services at Urbanscape Builders focus on delivering unique, high-quality structures tailored to complex requirements.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div> 
              <div className="col-md-4 col-lg-4">
                <div className="item">
                  <div className="service-image">
                    <img
                      src={CivilImg}
                      alt="Civil Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>Civil Construction</h3>
                    </div>
                    <div className="service-content">
                      <p>
                        Our Civil Construction services combine innovative engineering, durable materials, and precise execution to deliver structures that stand the test of time.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Services Section End */}
    
    </>
  )
}

export default ServicesGrid