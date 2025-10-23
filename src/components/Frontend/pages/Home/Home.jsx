import React from "react";
import Layout from "../../../layout";
import Buttons from "../../../common/Button";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import AboutCommon from "../../../common/AboutCommon";
import ServiceImg from "../../../../assets/images/construction2.jpg";
import BuildingImg from "../../../../assets/images/construction4.jpg";
import ResidentialImg from "../../../../assets/images/construction7.jpg";
import CoporateImg from "../../../../assets/images/construction6.jpg";
import GoaImg from "../../../../assets/images/construction5.jpg";
import DelhiImg from "../../../../assets/images/delhiproj.jpg";
import LucknowImg from "../../../../assets/images/lucknowproj.jpeg";
import KolkataImg from "../../../../assets/images/kolkataproj.jpg";
import Icon1 from "../../../../assets/images/icon-1.svg";
import Icon2 from "../../../../assets/images/icon-2.svg";
import Icon3 from "../../../../assets/images/icon-3.svg";
import AvatarImg from "../../../../assets/images/test-1.jpg";
import AvatarImg2 from "../../../../assets/images/test-4.jpg";
import AvatarImg3 from "../../../../assets/images/test-3.jpg";
import AvatarImg4 from "../../../../assets/images/test-1.jpg";
import BlogImg1 from "../../../../assets/images/construction1.jpg";
import BlogImg2 from "../../../../assets/images/construction2.jpg";
import BlogImg3 from "../../../../assets/images/construction3.jpg";

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
        <section className="section-3 bg-light py-3">
          <div className="container-fluid py-3">
            <div className="section-header text-center">
              <span>our services</span>
              <h2>Our Construction Services</h2>
              <p>
                We offer a diverse array of construction services, spanning
                residential, commercial, and industrial projects.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-3 col-lg-3">
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
              <div className="col-md-3 col-lg-3">
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
              <div className="col-md-3 col-lg-3">
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
              <div className="col-md-3 col-lg-3">
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
            </div>
          </div>
        </section>
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
        <section className="section-3 bg-light py-5">
          <div className="container-fluid py-3">
            <div className="section-header text-center">
              <span>our projects</span>
              <h2>Discover our diverse range of projects</h2>
              <p>
                Our projects showcase a diverse range of high-quality
                construction works, <br />
                reflecting innovation, precision, and excellence in every build.
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-md-3 col-lg-3">
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
              <div className="col-md-3 col-lg-3">
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
                        high-quality building solutions tailored for modern
                        urban development in Lucknow.
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3">
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
              <div className="col-md-3 col-lg-3">
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

        {/* Testimonials Section Start */}
        <section className="section-5 py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>our Testimonials</span>
              <h2>What people are saying about us</h2>
              <p>
                Our clients consistently praise us for our exceptional service,
                reliability, and attention to detail, <br /> highlighting how we
                go above and beyond to exceed expectations.
              </p>
            </div>
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={50}
              slidesPerView={3}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1 }, // mobile
                640: { slidesPerView: 1 }, // small screens
                768: { slidesPerView: 2 }, // tablets
                1024: { slidesPerView: 3 }, // desktop
              }}
            >
              <SwiperSlide>
                <div className="card shadow border-0">
                  <div className="card-body p-4">
                    <div className="ratings">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="content pt-4 pb-2">
                      <p>
                        Urbanscape Builders exceeded our expectations in every
                        way. The construction quality, timely delivery, and
                        transparent communication made the entire experience
                        seamless.
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex meta">
                      <div>
                        <img
                          src={AvatarImg}
                          alt="Testmonial Logo 1"
                          className="img-fluid"
                          width={50}
                        />
                      </div>
                      <div className="ps-3">
                        <div className="name">Rajesh Mehta</div>
                        <div>Managing Director, Mehta & Sons Pvt. Ltd.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card shadow border-0">
                  <div className="card-body p-4">
                    <div className="ratings">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="content pt-4 pb-2">
                      <p>
                        We purchased our corporate office space through
                        Urbanscape Builders, and the attention to detail was
                        impeccable. Their team truly understands modern business
                        needs.
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex meta">
                      <div>
                        <img
                          src={AvatarImg2}
                          alt="Testmonial Logo 1"
                          className="img-fluid"
                          width={50}
                        />
                      </div>
                      <div className="ps-3">
                        <div className="name">Priya Sharma</div>
                        <div>HR Head, TechNova Solutions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card shadow border-0">
                  <div className="card-body p-4">
                    <div className="ratings">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="content pt-4 pb-2">
                      <p>
                        The entire process from initial consultation to
                        possession was extremely well managed. I’d highly
                        recommend Urbanscape Builders for any commercial or
                        residential projects.
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex meta">
                      <div>
                        <img
                          src={AvatarImg3}
                          alt="Testmonial Logo 1"
                          className="img-fluid"
                          width={50}
                        />
                      </div>
                      <div className="ps-3">
                        <div className="name">Rohit Verma</div>
                        <div>Senior Architect, DesignHaus Studio</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card shadow border-0">
                  <div className="card-body p-4">
                    <div className="ratings">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                    <div className="content pt-4 pb-2">
                      <p>
                        The entire process from initial consultation to
                        possession was extremely well managed. I’d highly
                        recommend Urbanscape Builders for any commercial or
                        residential projects.
                      </p>
                    </div>
                    <hr />
                    <div className="d-flex meta">
                      <div>
                        <img
                          src={AvatarImg4}
                          alt="Testmonial Logo 1"
                          className="img-fluid"
                        />
                      </div>
                      <div className="ps-3">
                        <div className="name">Kunal Kapoor</div>
                        <div>Director, Horizon Technologies</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Testimonials Section End */}

        {/* Articles & Blog Section Start */}
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
              <div className="col-md-4 mb-3">
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
              <div className="col-md-4 mb-3">
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
              <div className="col-md-4 mb-3">
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
        {/* Articles & Blog Section End */}
      </Layout>
    </>
  );
};

export default Home;
