import React from 'react'
import { Link } from 'react-router-dom';
import BlogImg1 from "../../../../assets/images/construction1.jpg";
import BlogImg2 from "../../../../assets/images/construction2.jpg";
import BlogImg3 from "../../../../assets/images/construction3.jpg";

const BlogsGrid = () => {
  return (
   <>
        {/* Our Blogs Gris Section Start */}
        <section className="section-6 bg-light py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>our Blogs & News</span>
              <h2>Articles & Blogs</h2>
              <p>
                Explore our latest articles and blogs to stay updated on modern
                architecture,
                <br /> innovative construction trends, and smart home solutions.
              </p>
            </div>
            <div className="row pt-3">
              <div className="col-md-4 col-lg-4 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img
                      src={BlogImg1}
                      alt="Blog Image 1"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-2">
                      <Link to="#" className="title">
                        Smart Home Innovations for Modern Living
                      </Link>
                    </div>
                    <Link to="#" className="btn btn-primary mt-3 small">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img
                      src={BlogImg2}
                      alt="Blog Image 1"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-2">
                      <Link to="#" className="title">
                        Sustainable Construction Practices Every Builder Should Know
                      </Link>
                    </div>
                    <Link to="#" className="btn btn-primary mt-3 small">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 mb-3">
                <div className="card shadow border-0">
                  <div className="card-img-top">
                    <img
                      src={BlogImg3}
                      alt="Blog Image 1"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="card-body p-4">
                    <div className="mb-2">
                      <Link to="#" className="title">
                       Sustainable Construction Practices Every Builder Should Know
                      </Link>
                    </div>
                    <Link to="#" className="btn btn-primary mt-3 small">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Our Blogs Gris Section End */}
   </>
  )
}

export default BlogsGrid;