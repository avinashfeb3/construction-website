import React from "react";
import { Link } from "react-router-dom";
import GoaImg from "../../../../assets/images/construction5.jpg";
import DelhiImg from "../../../../assets/images/delhiproj.jpg";
import LucknowImg from "../../../../assets/images/lucknowproj.jpeg";
import KolkataImg from "../../../../assets/images/kolkataproj.jpg";

const ProjectsGrid = () => {
  return (
    <>
      <section className="section-3 bg-light py-5">
        <div className="container py-3">
          <div className="section-header text-center">
            <span>our projects</span>
            <h2>Discover our diverse range of projects</h2>
            <p>
              Our projects showcase a diverse range of high-quality construction
              works, <br />
              reflecting innovation, precision, and excellence in every build.
            </p>
          </div>
          <div className="row pt-4">
            <div className="col-md-4 col-lg-4">
              <div className="item">
                <div className="service-image">
                  <img
                    src={KolkataImg}
                    alt="Service Image"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="service-body mt-2 pt-2">
                  <div className="service-title">
                    <h3>Kolkata Project</h3>
                  </div>
                  <div className="service-content">
                    <p>
                      Kolkata Project Construction delivers efficient and
                      high-quality construction solutions tailored for the
                      city's urban development projects.
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
                    src={LucknowImg}
                    alt="Service Image"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="service-body mt-2 pt-2">
                  <div className="service-title">
                    <h3>Lucknow Project</h3>
                  </div>
                  <div className="service-content">
                    <p>
                      Lucknow Project Construction delivers reliable and
                      high-quality building solutions tailored for modern urban
                      development in Lucknow.
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
                    src={DelhiImg}
                    alt="Service Image"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="service-body mt-2 pt-2">
                  <div className="service-title">
                    <h3>Delhi Project</h3>
                  </div>
                  <div className="service-content">
                    <p>
                      Delhi Project Construction delivers top-quality, timely,
                      and innovative building solutions tailored for the
                      capital's dynamic infrastructure needs.
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
                    src={GoaImg}
                    alt="Service Image"
                    className="img-fluid w-100"
                  />
                </div>
                <div className="service-body mt-2 pt-2">
                  <div className="service-title">
                    <h3>Goa Project</h3>
                  </div>
                  <div className="service-content">
                    <p>
                      Goa Project Construction delivers premium, sustainable,
                      and modern building solutions tailored for the coastal
                      region.
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
      {/* Our Projects Section End */}
    </>
  );
};

export default ProjectsGrid;
