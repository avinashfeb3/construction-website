import React, { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const AdminProjectCreate = ({ placeholder }) => {
  const [create, setCreate] = useState([]);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const editor = useRef(null);
  const navigate = useNavigate();

  // 🧭 Jodit Editor config
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Enter Content...",
    }),
    [placeholder]
  );

  // ⚙️ React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
    reset,
  } = useForm();

  // 🔤 Generate slug automatically
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // 🚀 Form Submit Handler
  const onSubmit = async (data) => {
    try {
      const newData = { ...data, content, imageId };
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", {
          autoClose: 3000,
        });
        navigate("/admin/login");
        return;
      }

      const url = `${apiUrl.replace(/\/+$/, "")}/projects`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newData),
      };

      const res = await fetch(url, options);
      const result = await res.json();

      if (!res.ok) {
        console.error("HTTP Error:", res.status, result);
        // try to surface validation or message from the response
        if (result && result.errors) {
          Object.values(result.errors).flat().forEach((msg) =>
            toast.error(msg, { autoClose: 3000 })
          );
        } else if (result && result.message) {
          toast.error(result.message, { autoClose: 3000 });
        } else {
          toast.error(`HTTP error ${res.status}`, { autoClose: 3000 });
        }
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      // Only show error toast when API explicitly indicates failure
      if (result.status === true) {
        toast.success(result.message || "Project created successfully!", {
          autoClose: 1500,
        });

        // Update local state and reset form only on success
        setCreate(result?.data || []);
        reset();
        setContent("");
        setImagePreview(null);
        setImageId(null);

        navigate("/admin/projects");
      } else if (result.status === false) {
        // API returned failure, show validation messages if present
        if (result.errors) {
          Object.values(result.errors).flat().forEach((msg) =>
            toast.error(msg, { autoClose: 3000 })
          );
        } else if (result.message) {
          toast.error(result.message, { autoClose: 2000 });
        } else {
          toast.error("Failed to create projects.", { autoClose: 2000 });
        }
      }
    } catch (error) {
      // console.error("❌ Error creating projects:", error);
      toast.error("Failed to create projects.", { autoClose: 3000 });
    }
  };

  // Image Upload Handler
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        toast.error("Please select an image file.");
        return;
      }

      // ✅ Preview image
      setImagePreview(URL.createObjectURL(file));

      const authToken = token();
      if (!authToken) {
        toast.error("No token found. Please log in again.", {
          autoClose: 3000,
        });
        navigate("/admin/login");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      setIsDisable(true);

      const response = await fetch(
        `${apiUrl.replace(/\/+$/, "")}/temp-images`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      // 🧠 Handle validation or API errors
      if (!response.ok || result.status === false) {
        console.error("Image upload failed:", result);
       
        // ✅ Check for Laravel validation errors
        if (
          result.errors &&
          result.errors.image &&
          Array.isArray(result.errors.image)
        ) {
          toast.error(result.errors.image[0]);
        } else if (result.image && Array.isArray(result.image)) {
          toast.error(result.image[0]);
        } else {
          toast.error(result?.message || "Failed to upload image.");
        }

        return;
      }
        setIsDisable(false);
      // ✅ Success
      setImageId(result.data.id);
      toast.success("Image uploaded successfully!", { autoClose: 1500 });
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      toast.error("Image upload failed. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-4 px-4 my-1 py-1">
        <div className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
            <h3>Create Projects</h3>
            <div className="d-flex mb-3 mt-2">
              <Link
                to="/admin/projects"
                className="btn btn-primary d-flex align-items-center me-2"
              >
                <span>Back</span>
              </Link>
            </div>
          </div>

          <div className="mx-3 px-3">
            <hr />
          </div>

          {/* 📝 Form Section */}
          <div className="mx-4 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="title"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  placeholder="Enter Name..."
                  {...register("title", {
                    required: "The Name field is required",
                  })}
                  onChange={(e) => {
                    const value = e.target.value;
                    setValue("title", value);
                    setValue("slug", generateSlug(value));
                    trigger("title");
                  }}
                />
                {errors.name && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.name.message}
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
                  id="slug"
                  className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                  {...register("slug", {
                    required: "The slug field is required",
                  })}
                  readOnly
                />
                {errors.slug && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.slug.message}
                  </p>
                )}
              </div>
              <div className="row">
                <div className="col-md-6">
                  {/* Location */}
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Location
                    </label>
                    <select
                      id="location"
                      className={`form-control ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      defaultValue=""
                      {...register("location")}
                    >
                      <option value="0">Select Location</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Lucknow">Lucknow</option>
                      <option value="Goa">Goa</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Construction Type */}
                  <div className="mb-3">
                    <label htmlFor="construction_type" className="form-label">
                      Construction Type
                    </label>
                    <select
                      id="construction_type"
                      className={`form-control ${
                        errors.construction_type ? "is-invalid" : ""
                      }`}
                      defaultValue=""
                      {...register("construction_type", {
                        required: "The construction Type field is required",
                      })}
                    >
                      <option value="">Select Construction Type</option>
                      <option value="Education">Education</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                    {errors.construction_type && (
                      <p className="text-danger mt-2 invalid-feedback">
                        {errors.construction_type.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                    {/* Sector */}
                  <div className="mb-3">
                    <label htmlFor="sector" className="form-label">
                      Sector
                    </label>
                    <select
                      id="sector"
                      className={`form-control ${
                        errors.sector ? "is-invalid" : ""
                      }`}
                      defaultValue=""
                      {...register("sector", {
                        required: "The sector field is required",
                      })}
                    >
                      <option value="0">Select Sector</option>
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="infrastructure">Infrastructure</option>
                      <option value="residential">Residential</option>
                    </select>
                    {errors.sector && (
                      <p className="text-danger mt-2 invalid-feedback">
                        {errors.sector.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Status */}
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                      defaultValue=""
                      {...register("status", {
                        required: "The status field is required",
                      })}
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
                </div>
              </div>

              {/* Short Description */}
              <div className="mb-3">
                <label htmlFor="short_desc" className="form-label">
                  Short Description
                </label>
                <textarea
                  id="short_desc"
                  rows="4"
                  className={`form-control ${
                    errors.short_desc ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Short Description..."
                  {...register("short_desc", {
                    required: "The short description field is required",
                  })}
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
                    setValue("content", newContent);
                    trigger("content");
                  }}
                  onChange={() => {}}
                />
                {errors.content && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.content.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  className={`form-control ${errors.image ? "is-invalid" : ""}`}
                  {...register("image", {
                    required: "The image field is required",
                    onChange: handleFileChange,
                  })}
                />
                {errors.image && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.image.message}
                  </p>
                )}

                {/* 🖼️ Preview Image */}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={isDisable}
                className="btn btn-success d-flex align-items-center mb-3"
              >
                <span>Create</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjectCreate;
