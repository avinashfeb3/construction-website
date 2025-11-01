import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import Hero from "../../../common/Hero";
import { apiFileUrl, apiUrl } from "../../../common/http";
import { Link, useParams } from "react-router-dom";
import LatestTestimonials from "../../../common/LatestTestimonials";

const ServiceDetails = () => {
  const [services, setServices] = useState([]); // All services for sidebar
  const [serviceDetails, setServiceDetails] = useState(null); // Single service details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  // ✅ Fetch all services for sidebar
  const fetchServices = async () => {
    try {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-services`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setServices(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([]);
    }
  };

  // ✅ Fetch single service details by ID
  const fetchServiceDetails = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl.replace(/\/+$/, "")}/get-services/${params.id}`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setServiceDetails(result.data || {});
      setError("");
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError("Failed to load service details. Please try again later.");
      setServiceDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Call both APIs on mount and when params.id changes
  useEffect(() => {
    fetchServices();
    fetchServiceDetails();
  }, [params.id]);

  return (
    <Layout>
      <section className="service_details_wrapper">
        {/* ✅ Hero Section */}
        <Hero
          preheading="Building the Future, One Structure at a Time"
          heading={serviceDetails?.title || "Service Details"}
        />

        {/* ✅ Service Details Content Section */}
        <div className="container py-5">
          <div className="row">
            {/* Sidebar - All Services */}
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 sidebar">
                <div className="card-body">
                  <div className="px-4 py-4">
                    <h3>Our Services</h3>
                    <ul className="list-unstyled">
                      {Array.isArray(services) && services.length > 0 ? (
                        services.map((service) => (
                          <li
                            key={`service-${service.id}`}
                            className="mt-2 pt-2 mb-2 pb-2 border-bottom"
                          >
                            <Link
                              to={`/services/service-details/${service.id}`}
                              className={
                                service.id === parseInt(params.id)
                                  ? "fw-bold text-primary"
                                  : "text-dark text-decoration-none"
                              }
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>No services available.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Service Details */}
            <div className="col-md-8">
              {loading ? (
                <p>Loading service details...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : serviceDetails ? (
                <>
                  {serviceDetails.image && (
                    <div>
                      <img
                        src={`${apiFileUrl}uploads/services/small/${serviceDetails.image}`}
                        alt={serviceDetails.title}
                        className="img-fluid mb-4 w-100 object-cover"
                        style={{ height: "350px", objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <h3 className="py-3">{serviceDetails.title}</h3>

                  {serviceDetails.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: serviceDetails.content,
                      }}
                    />
                  ) : (
                    <p>No details available for this service.</p>
                  )}
                </>
              ) : (
                <p>No service found.</p>
              )}
            </div>
          </div>

          {/* Testimonial Section */}
          <section className="bg-light py-5 my-5">
            <div className="container">
          <div className="row">
            <div className="col-md-12">
              <LatestTestimonials />
            </div>
          </div>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetails;
