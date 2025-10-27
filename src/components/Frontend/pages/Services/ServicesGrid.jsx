import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl, apiFileUrl } from "../../../common/http";

const ServicesGrid = () => {
  const [services, setServices] = useState([]);

  // Fetch All Services
  const fetchAllServices = async () => {
    try {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-services`;
      const res = await fetch(url);
      const result = await res.json();

      if (!res.ok) {
        console.error("HTTP Error:", res.status, result);
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      // console.log("Fetched Services:", result);
      setServices(result.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <>
      {/* Our Services Section Start */}
      <section className="section-3 bg-light py-3">
        <div className="container py-3">
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
                         services && services.map((service, index)=> {
                           return(
                                <div className="col-md-4 col-lg-4" key={index}>
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
      {/* Our Services Section End */}
    </>
  );
};

export default ServicesGrid;
