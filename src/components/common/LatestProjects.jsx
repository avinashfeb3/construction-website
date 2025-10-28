import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFileUrl, apiUrl} from "../common/http";

const LatestProjects = ({ limit= 4}) => {
      const [projects, setProjects] = useState([]);

      // Call Latest Projects API Section Start
  const fetchLatestProjects = async () => {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-latest-projects?limit=${limit}`;
  
        const options = {
          method: "GET",
        };
  
        const res = await fetch(url, options);
        const result = await res.json();
        setProjects(result.data);
        // console.log(result);
        
  
        if (!res.ok) {
          console.error("HTTP Error:", res.status, result);
          throw new Error(result.message || `HTTP error ${res.status}`);
        }
  }

  useEffect(() => {
    fetchLatestProjects();
  },[]);
  // Call Latest Services API Section End

  return (
    <>
       <section className="section-3 bg-light py-3">
          <div className="container-fluid py-3">
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
              {
                projects && projects.map((project, index) => {
                  return(
                       <div className="col-md-3 col-lg-3" key={index}>
                <div className="item">
                  <div className="service-image">
                    <img
                      src={`${apiFileUrl}uploads/projects/small/${project.image}`}
                      alt="Project Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>{project.title}</h3>
                    </div>
                    <div className="service-content">
                      <p>
                       {project.short_desc}
                      </p>
                      <Link to="#" className="btn btn-primary small">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
                  )
                })
              }
            </div>
          </div>
        </section>
    
    
    
    </>
  )
}

export default LatestProjects;