import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

const AdminArticlesShow = () => {
  const [articles, setArticles] = useState([]);

  // Services API Call Here
  const fetchArticles = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/articles`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };
      console.debug("Fetching projects", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);
      setArticles(result?.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Article Delete Function API Call Here
  const deleteArticle = async (id) => {
    if (confirm("Are you sure to delete this article?") !== true) return;

    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/articles/${id}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      const res = await fetch(url, options);

      // try to parse JSON even on non-ok to show messages
      let result = null;
      try {
        result = await res.json();
      } catch (parseErr) {
        // ignore parse error
      }

      if (!res.ok) {
        const msg = result?.message || `HTTP error ${res.status}`;
        toast.error(msg || "Failed to delete article.");
        return;
      }

      // Consider both `status` and `success` flags from API
      const okFlag = result?.status === true || result?.success === true || res.status === 200;

      if (okFlag) {
        // remove the deleted article from local state immediately so no refresh required
        setArticles((prev) => prev.filter((a) => a.id !== id));
        toast.success(result?.message || "Article deleted successfully.");
      } else {
        toast.error(result?.message || "Failed to delete article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Failed to delete article.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
          <h3>Articles</h3>
          <Link to="/admin/articles/create" className="btn btn-secondary mb-1 d-flex align-items-center">
            <IoIosAdd size={23} className="me-2" />
            <span>Create</span>
          </Link>
        </div>

        <div className="mx-3 px-3">
          <hr />
        </div>

        {/* Table Service show Section Start */}
        <div className="table-responsive mx-4 px-4">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Author</th>
                {/* <th>Content</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles &&
                articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.slug}</td>
                    <td>{article.author}</td>
                  {/* <td>
                    {article.content
                      ? typeof article.content === "string"
                        ? article.content
                        : article.sector.name
                      : ""}
                  </td> */}
                    <td>{
                    (article.status == 1) ? 'Active' : 'Inactive'
                    }
                    </td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link to={`/admin/articles/edit/${article.id}`} className="btn btn-primary btn-sm me-2" title="Edit">
                        <FaRegEdit/>
                      </Link>
                      <Link onClick={() => deleteArticle(article.id)} className="btn btn-danger btn-sm" title="Delete">
                        <MdDelete/>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* Table Service show Section End */}
      </div>
    </>
  );
};

export default AdminArticlesShow;
