import React from "react";
import { Link } from "react-router-dom";

const ContactForm = () => {
  return (
    <>
      <section className="contact-form-wrapper py-5">
        <div className="container">
          <div className="section-header text-center">
            <h2>Contact Us</h2>
            <p>
              Our dedicated experts are here to help you with any of your
              questions, contact us by <br /> filling out the form below and we
              will be in touch shortly.
            </p>
          </div>
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-3 m-3">
                  <div>
                    <h3>Call Us</h3>
                    <div>
                      <Link to="tel:(+1) 234567890">(+1) 234 567 890</Link>
                    </div>
                    <div>
                      <Link to="tel:(+2)2212312345">(+2) 22-123-12345</Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3>You can write us</h3>
                  </div>
                  <Link to="mailto:smith@urbanscape.com">
                    smith@urbanscape.com
                  </Link>
                  <div>
                    <div>
                      <Link to="mailto:info@urbanscape.com">
                        info@urbanscape.com
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3>Address</h3>
                    <ul>
                      <li>
                        Address: 5505 Waterford District Dr, Miami, FL 33126
                        United States
                      </li>
                      <li>
                        <Link to="tel:1234567890">Phone: 123-456-7890</Link>
                      </li>
                      <li>
                        <Link to="mailto:info@urbanscape.com">
                          Email: info@urbanscape.com
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card shadow border-0">
                <div className="card-body p-5">
                  <form action="" method="">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Name.."
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          placeholder="Enter Phone.."
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label htmlFor="subject" className="form-label">
                          Subject
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter Subject.."
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          placeholder="Enter Email.."
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className="form-control form-control-lg"
                        rows="5"
                        placeholder="Enter Message.."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary large mt-3"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Google Map Section Start */}
      <section className="map-responsive mb-4 ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.6389025350327!2d-80.28971912402623!3d25.782488107744857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9dcc8616a2b%3A0xc8cb92d36df969a8!2s5505%20Waterford%20District%20Dr%2C%20Miami%2C%20FL%2033126%2C%20USA!5e0!3m2!1sen!2sin!4v1710588531512!5m2!1sen!2sin"
                width="1200"
                height="600"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Responsive Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* Google Map Section End */}
    </>
  );
};

export default ContactForm;
