import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, getFileUrl } from "../../../common/http"; // ✅ Make sure this file exports both

const AboutTeam = () => {
  const [members, setMembers] = useState([]);

  // ✅ Fetch team members from API
  const fetchMembers = async () => {
    try {
      const url = `${apiUrl.replace(/\/+$/, "")}/get-members`;
      const res = await fetch(url, { method: "GET" });
      const result = await res.json();

      console.log("API Response:", result);

      if (!res.ok) {
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      // ✅ Always set array
      if (Array.isArray(result.data)) {
        setMembers(result.data);
      } else {
        setMembers([]);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <section className="team_wrapper bg-light py-5">
      <div className="container">
        <div className="section-header text-center">
          <span>our team</span>
          <h2>Our Expert Team</h2>
          <p>
            Our team at Urbanscape Builders is a dedicated group of architects,
            designers, and construction experts who combine creativity,
            precision, and experience.
          </p>
        </div>

        <div className="row pt-3">
          {members.length > 0 ? (
            members.map((member, index) => {
              // ✅ Properly form the image URL
              const imgSrc = member.image
                ? getFileUrl(`uploads/member/${member.image}`)
                : "/default-member.jpg"; // fallback image

              return (
                <div className="col-md-6 col-lg-3 mb-3" key={index}>
                  <div className="card shadow border-0 h-100">
                    <div className="card-img-top">
                      <img
                        className="w-100"
                        src={imgSrc}
                        alt={member.name || "Team Member"}
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="card-body p-4">
                      <h5 className="card-title pb-0 mb-1">
                        {member.name || "Member Name not available"}
                      </h5>
                      <p className="card-subtitle mb-2 text-muted">
                        {member.job_title || "Designation not available"}
                      </p>

                      {member.linkedin_url && (
                        <Link
                          to={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary me-2"
                        >
                          <i className="bi bi-linkedin fs-5"></i>
                        </Link>
                      )}

                      {member.facebook_url && (
                        <Link
                          to={member.facebook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black"
                        >
                          <i className="bi bi-facebook fs-5"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <p className="text-center">No team members found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
