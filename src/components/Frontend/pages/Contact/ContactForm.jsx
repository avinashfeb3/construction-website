import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "../../../common/http";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);

  const buildApiEndpoint = (path) => {
    // Ensure we have a usable base. Fallback to local Laravel API if VITE var is empty.
    const raw = apiUrl && typeof apiUrl === "string" ? apiUrl.trim() : "";
    const base = raw;
    const normalizedBase = base.endsWith("/") ? base : base + "/";
    return normalizedBase + path.replace(/^\/+/, "");
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const endpoint = buildApiEndpoint("contact-now");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Non-2xx response; attempt to gather body for debugging
        const text = await res.text();
        console.error("Contact form server error:", res.status, text);
        toast.error("Server error while sending message.");
        return;
      }

      const result = await res.json();

      if (result && result.status === true) {
        toast.success(result.message || "Message sent successfully!");
        reset();
      } else {
        toast.error((result && result.message) || "Failed to send message");
      }
    } catch (err) {
      console.error("Error sending contact message:", err);
      toast.error("An error occurred while sending the message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="contact-form-wrapper py-5">
        <div className="container">
          <div className="section-header text-center">
            <h2>Contact Us</h2>
            <p>
              Our dedicated experts are here to help you with any of your
              questions. Contact us by filling out the form below and we
              will be in touch shortly.
            </p>
          </div>

          <div className="row mt-5">
            {/* Sidebar */}
            <div className="col-md-4">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-3 m-3">
                  <h3>Call Us</h3>
                  <div>
                    <a href="tel:(+1)234567890">(+1) 234 567 890</a>
                  </div>
                  <div>
                    <a href="tel:(+2)2212312345">(+2) 22-123-12345</a>
                  </div>

                  <div className="mt-4">
                    <h3>You can write us</h3>
                    <a href="mailto:smith@urbanscape.com">smith@urbanscape.com</a>
                    <div>
                      <a href="mailto:info@urbanscape.com">info@urbanscape.com</a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3>Address</h3>
                    <ul className="list-unstyled">
                      <li>
                        5505 Waterford District Dr, Miami, FL 33126, United States
                      </li>
                      <li>
                        <a href="tel:1234567890">Phone: 123-456-7890</a>
                      </li>
                      <li>
                        <a href="mailto:info@urbanscape.com">Email: info@urbanscape.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-md-8">
              <div className="card shadow border-0">
                <div className="card-body p-5">
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Name.."
                          {...register("name", {
                            required: "The Name is required",
                          })}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">
                            {errors.name.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="form-label">Phone</label>
                        <input
                          type="tel"
                          className={`form-control form-control-lg ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Phone.."
                          {...register("phone", {
                            required: "The Phone Number is required",
                          })}
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">
                            {errors.phone.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="form-label">Subject</label>
                        <input
                          type="text"
                          className={`form-control form-control-lg ${
                            errors.subject ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Subject.."
                          {...register("subject", {
                            required: "The Subject is required",
                          })}
                        />
                        {errors.subject && (
                          <div className="invalid-feedback">
                            {errors.subject.message}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className={`form-control form-control-lg ${
                            errors.email ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Email.."
                          {...register("email", {
                            required: "The Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">
                            {errors.email.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Message</label>
                      <textarea
                        className={`form-control form-control-lg ${
                          errors.message ? "is-invalid" : ""
                        }`}
                        rows="5"
                        placeholder="Enter Message.."
                        {...register("message", {
                          required: "The Message is required",
                        })}
                      ></textarea>
                      {errors.message && (
                        <div className="invalid-feedback">
                          {errors.message.message}
                        </div>
                      )}
                    </div>

                      <button
                        type="submit"
                        className="btn btn-primary large mt-3"
                        disabled={submitting}
                      >
                        {submitting && (
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {submitting ? "Sending..." : "Send Message"}
                      </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="map-responsive mb-4">
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
    </>
  );
};

export default ContactForm;
