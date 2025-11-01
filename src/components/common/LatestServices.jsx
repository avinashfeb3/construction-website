import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFileUrl, apiUrl} from "../common/http";

const LatestServices = ({ limit = 4 }) => {
      const [services, setServices] = useState([]);

      // Call Latest Services API Section Start
  const fetchLatestServices = async () => {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-latest-services?limit=${limit}`;
  
        const options = {
          method: "GET",
        };
  
        const res = await fetch(url, options);
        const result = await res.json();
        setServices(result.data);
        // console.log(result);
        
  
        if (!res.ok) {
          console.error("HTTP Error:", res.status, result);
          throw new Error(result.message || `HTTP error ${res.status}`);
        }
  }

  useEffect(() => {
    fetchLatestServices();
  },[]);
  // Call Latest Services API Section End

  return (
    <>
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
              {
                services && services.map((service, index) => {
                  return(
                       <div className="col-md-3 col-lg-3" key={index}>
                <div className="item">
                  <div className="service-image">
                    <img
                      src={`${apiFileUrl}uploads/services/small/${service.image}`}
                      alt="Service Image"
                      className="img-fluid w-100"
                    />
                  </div>
                  <div className="service-body mt-2 pt-2">
                    <div className="service-title">
                      <h3>{service.title}</h3>
                    </div>
                    <div className="service-content">
                      <p>
                       {service.short_desc}
                      </p>
                      <Link to={`services/service-details/${service.id}`} className="btn btn-primary small">
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

export default LatestServices;