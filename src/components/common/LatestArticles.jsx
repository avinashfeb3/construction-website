import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFileUrl, apiUrl } from "./http";

const LatestArticles = ({ limit = 3 }) => {
  const [articles, setArticles] = useState([]);

  // Call Latest Projects API Section Start
  const fetchLatestArticles = async () => {
    const url = `${apiUrl.replace(
      /\/+$/,
      ""
    )}/get-latest-articles?limit=${limit}`;

    const options = {
      method: "GET",
    };

    const res = await fetch(url, options);
    const result = await res.json();
    setArticles(result.data);
    // console.log(result);

    if (!res.ok) {
      console.error("HTTP Error:", res.status, result);
      throw new Error(result.message || `HTTP error ${res.status}`);
    }
  };

  useEffect(() => {
    fetchLatestArticles();
  }, []);
  // Call Latest Services API Section End

  return (
    <>
      <section className="section-6 bg-light py-5">
        <div className="container">
          <div className="section-header text-center">
            <span>our Blogs & News</span>
            <h2>Articles & Blogs</h2>
            <p>
              Explore our latest articles and blogs to stay updated on modern
              architecture,
              <br /> innovative construction trends, and smart home solutions.
            </p>
          </div>
          <div className="row pt-3">
            {articles &&
              articles.map((article, index) => {
                return (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="card shadow border-0">
                      <div className="card-img-top">
                        <img
                          src={`${apiFileUrl}uploads/articles/small/${article.image}`}
                          alt="Article Image"
                          className="img-fluid w-100"
                        />
                      </div>
                      <div className="card-body p-4">
                        <div className="mb-2">
                          <Link to="#" className="title">
                            {article.title}
                          </Link>
                        </div>
                        <Link to={`/blog/articles/${article.id}`} className="btn btn-primary mt-3 small">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestArticles;
