import React, { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const AdminServicesShow = ({ placeholder }) => {
  const [create, setCreate] = useState([]);
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();

  // Config for Jodit Editor
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Enter Content...",
    }),
    [placeholder]
  );

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  // Helper function to generate slug
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // Form submit
  const onSubmit = async (data) => {
    try {
      const newData = { ...data, content };

      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/services`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(newData),
      };

      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.message, { autoClose: 300 });
        navigate("/admin/services");
      } else {
        toast.error(result.message, { autoClose: 300 });
      }

      setCreate(result?.data || []);
      reset();
      setContent(""); // reset editor content
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service.", { autoClose: 300 });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-4 px-4 my-1 py-1">
        <div className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
            <h3>Create Services</h3>
            <div className="d-flex mb-3 mt-2">
              <Link
                to="/admin/services"
                className="btn btn-secondary d-flex align-items-center me-2"
              >
                <span>Back</span>
              </Link>
            </div>
          </div>

          <div className="mx-3 px-3">
            <hr />
          </div>

          {/* Create Service Form Section */}
          <div className="mx-4 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  {...register("title", { required: "The title field is required" })}
                  id="name"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter Title..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("title", value);
                    setValue("slug", generateSlug(value));
                    trigger("title");
                  }}
                />
                {errors.title && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="mb-3">
                <label htmlFor="slug" className="form-label">
                  Slug
                </label>
                <input
                  type="text"
                  {...register("slug", { required: "The slug field is required" })}
                  id="slug"
                  className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                  placeholder="Enter Slug..."
                  readOnly
                />
                {errors.slug && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label htmlFor="short_desc" className="form-label">
                  Short Description
                </label>
                <textarea
                  id="short_desc"
                  {...register("short_desc", {
                    required: "The short description field is required",
                  })}
                  className={`form-control ${errors.short_desc ? "is-invalid" : ""}`}
                  rows={4}
                  placeholder="Enter Short Description..."
                ></textarea>
                {errors.short_desc && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.short_desc.message}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setContent(newContent);
                    setValue("content", newContent); // update react-hook-form
                    trigger("content"); // trigger validation
                  }}
                  onChange={() => {}}
                />
                {errors.content && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  {...register("status", { required: "The status field is required" })}
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  defaultValue=""
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center mb-3"
              >
                <span>Submit</span>
              </button>
            </form>
          </div>
          {/* Create Service Form Section End */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServicesShow;
