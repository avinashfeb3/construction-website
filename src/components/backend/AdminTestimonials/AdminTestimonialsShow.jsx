import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

const AdminTestimonialsShow = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Services API Call Here
  const fetchTestimonials = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/testimonials`;

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
      setTestimonials(result?.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Article Delete Function API Call Here
  const deleteTestimonials = async (id) => {
    if (confirm("Are you sure to delete this testimonial?") !== true) return;

    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/testimonials/${id}`;

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
        // remove the deleted testimonial from local state immediately so no refresh required
        setTestimonials((prev) => prev.filter((a) => a.id !== id));
        toast.success(result?.message || "Testimonial deleted successfully.");
      } else {
        toast.error(result?.message || "Failed to delete testimonial.");
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial.");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
          <h3>Testimonials</h3>
          <Link to="/admin/testimonials/create" className="btn btn-secondary mb-1 d-flex align-items-center">
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
                <th>Testimonials</th>
                <th>Citation</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonials &&
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id}>
                    <td>{testimonial.id}</td>
                    <td>{testimonial.testimonial}</td>
                    <td>{testimonial.citation}</td>
                    <td>{testimonial.designation}</td>
                    <td>{
                    (testimonials.status == 1) ? 'Active' : 'Inactive'
                    }
                    </td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link to={`/admin/testimonials/edit/${testimonial.id}`} className="btn btn-primary btn-sm me-2" title="Edit">
                        <FaRegEdit/>
                      </Link>
                      <Link onClick={() => deleteTestimonials(testimonial.id)} className="btn btn-danger btn-sm" title="Delete">
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

export default AdminTestimonialsShow;
