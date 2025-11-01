import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl, apiFileUrl } from "../../../common/http";

const ProjectGrid = () => {
  const [projects, setProjects] = useState([]);

  // Fetch All Projects
  const fetchAllProjects = async () => {
    try {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-projects`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) {
        console.error("HTTP Error:", res.status, result);
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      // console.log("Fetched Services:", result);
      setProjects(result.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchAllProjects();
  }, []);

  return (
    <>
      {/* Our Services Section Start */}
      <section className="section-3 bg-light py-3">
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
            {projects &&
              projects.map((project, index) => {
                return (
                  <div className="col-md-4 col-lg-4" key={index}>
                    <div className="item">
                      <div className="service-image">
                        <img
                          src={`${apiFileUrl}uploads/projects/small/${project.image}`}
                          alt="Service Image"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="service-body mt-2 pt-2">
                        <div className="service-title">
                          <h3>{project.title}</h3>
                        </div>
                        <div className="service-content">
                          <p>{project.short_desc}</p>
                          <Link to={`/projects/project-details/${project.id}`} className="btn btn-primary small">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {/* Our Services Section End */}
    </>
  );
};

export default ProjectGrid;
