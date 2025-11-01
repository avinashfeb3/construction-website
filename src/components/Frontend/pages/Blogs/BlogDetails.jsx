import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import Hero from "../../../common/Hero";
import { apiFileUrl, apiUrl } from "../../../common/http";
import { Link, useParams } from "react-router-dom";
import LatestTestimonials from "../../../common/LatestTestimonials";

const BlogDetails = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [blogDetails, setBlogDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  // ✅ Fetch all blogs for sidebar
  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/get-latest-articles`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setLatestArticles(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setLatestArticles([]);
    }
  };

  // ✅ Fetch single blog details by ID
  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl.replace(/\/+$/, "")}/get-articles/${params.id}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);
      setBlogDetails(result.data || null);
      setError("");
    } catch (err) {
      console.error("Error fetching blog details:", err);
      setError("Failed to load blog details. Please try again later.");
      setBlogDetails(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestBlogs();
    fetchBlogDetails();
  }, [params.id]);

  return (
    <Layout>
      <section className="blog_details_wrapper">
        <Hero
          preheading="Building the Future, One Structure at a Time"
          heading={blogDetails?.title || "Blog Details"}
        />

        <div className="container py-5">
          <div className="row">
            {/* Left side: Blog details */}
            <div className="col-md-8 py-3">
              {loading ? (
                <p>Loading blog details...</p>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : blogDetails ? (
                <>
                  <h3>{blogDetails.title}</h3>
                  <div className="mb-3">
                    By <strong>{blogDetails.author || "Author"}</strong> on{" "}
                    {new Date(blogDetails.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>

                  <img
                    src={
                      blogDetails.image
                        ? `${apiFileUrl}uploads/articles/small/${blogDetails.image}`
                        : "/placeholder.jpg"
                    }
                    alt={blogDetails.title}
                    className="img-fluid mb-4 mt-4 w-100 object-cover"
                    style={{ height: "350px", objectFit: "cover" }}
                  />

                  <div
                    className="pt-3"
                    dangerouslySetInnerHTML={{ __html: blogDetails.content }}
                  ></div>
                </>
              ) : (
                <p>No blog found.</p>
              )}
            </div>

            {/* Right side: Latest blogs */}
            <div className="col-md-4">
              <div className="card shadow border-0 blog_sidebar">
                <div className="card-body px-5 py-4">
                  <h3 className="mt-2 mb-3">Latest Blogs</h3>
                  <div>
                    {latestArticles.map((article) => (
                      <div
                        key={article.id}
                        className="d-flex align-items-center border-bottom py-3"
                      >
                        <img
                          src={`${apiFileUrl}uploads/articles/small/${article.image}`}
                          alt={article.title}
                          className="img-fluid me-3 rounded"
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <Link
                            to={`/blog/articles/${article.id}`}
                          >
                            {article.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <section className="bg-light py-5 my-5">
            <div className="container">
              <LatestTestimonials />
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
