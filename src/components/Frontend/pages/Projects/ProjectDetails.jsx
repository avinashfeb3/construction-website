import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import Hero from "../../../common/Hero";
import { apiFileUrl, apiUrl } from "../../../common/http";
import { useParams } from "react-router-dom";
import LatestTestimonials from "../../../common/LatestTestimonials";

const ProjectDetails = () => {
  const [projects, setProjects] = useState([]); // All projects for sidebar
  const [projectDetails, setProjectDetails] = useState(null); // Single project details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  // ✅ Fetch all projects for sidebar
  const fetchProjects = async () => {
    try {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-projects`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setProjects(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  // ✅ Fetch single project details by ID
  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const url = `${apiUrl.replace(/\/+$/, "")}/get-projects/${params.id}`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setProjectDetails(result.data || {});
      setError("");
    } catch (error) {
      console.error("Error fetching project details:", error);
      setError("Failed to load project details. Please try again later.");
      setProjectDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch data on mount and when params.id changes
  useEffect(() => {
    fetchProjects();
    fetchProjectDetails();
  }, [params.id]);

  return (
    <Layout>
      <section className="service_details_wrapper">
        {/* ✅ Hero Section */}
        <Hero
          preheading="Building the Future, One Structure at a Time"
          heading={projectDetails?.title || "Project Details"}
        />

        {/* ✅ Project Details Content Section */}
        <div className="container py-5">
          <div className="row">
            {/* Sidebar - Project Insights */}
            <div className="col-md-4 mb-4">
              <div className="card shadow border-0 sidebar">
                <div className="card-body">
                  <div className="px-4 py-4">
                    <h3>Project Insights</h3>
                    <ul className="list-unstyled">
                      {projectDetails?.location && (
                        <li className="mt-3 pt-2 mb-3 border-bottom pb-2">
                          <span className="text-body-secondary d-block fw-semibold">
                            Location
                          </span>
                          <p className="mb-0">{projectDetails.location}</p>
                        </li>
                      )}
                      {projectDetails?.construction_type && (
                        <li className="mb-3 border-bottom pb-2">
                          <span className="text-body-secondary d-block fw-semibold">
                            Construction Type
                          </span>
                          <p className="mb-0">{projectDetails.construction_type}</p>
                        </li>
                      )}
                      {projectDetails?.sector && (
                        <li className="mb-3 border-bottom pb-2">
                          <span className="text-body-secondary d-block fw-semibold">
                            Sector
                          </span>
                          <p className="mb-0">{projectDetails.sector}</p>
                        </li>
                      )}
                      {!projectDetails?.location &&
                        !projectDetails?.construction_type &&
                        !projectDetails?.sector && (
                          <li>No insights available for this project.</li>
                        )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Project Details */}
            <div className="col-md-8">
              {loading ? (
                <p>Loading project details...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : projectDetails ? (
                <>
                  {projectDetails.image && (
                    <div>
                      <img
                        src={`${apiFileUrl}uploads/projects/small/${projectDetails.image}`}
                        alt={projectDetails.title}
                        className="img-fluid mb-4 w-100 object-cover"
                        style={{ height: "350px", objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <h3 className="py-3">{projectDetails.title}</h3>

                  {projectDetails.content ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: projectDetails.content,
                      }}
                    />
                  ) : (
                    <p>No details available for this project.</p>
                  )}
                </>
              ) : (
                <p>No project found.</p>
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

export default ProjectDetails;
