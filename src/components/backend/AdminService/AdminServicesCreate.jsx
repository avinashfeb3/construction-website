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
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      const url = `${apiUrl.replace(/\/+$/, "")}/services`;

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
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      if (result.status === true) {
        toast.success(result.message || "Service created successfully!", {
          autoClose: 1500,
        });
        navigate("/admin/services");
      } else {
        toast.error(result.message || "Failed to create service.", {
          autoClose: 2000,
        });
      }

      setCreate(result?.data || []);
      reset();
      setContent("");
      setImagePreview(null);
      setImageId(null);
    } catch (error) {
      // console.error("❌ Error creating service:", error);
      toast.error("Failed to create service.", { autoClose: 3000 });
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
      toast.error("No token found. Please log in again.", { autoClose: 3000 });
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setIsDisable(true);

    const response = await fetch(`${apiUrl.replace(/\/+$/, "")}/temp-images`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    // 🧠 Handle validation or API errors
    if (!response.ok || result.status === false) {
      console.error("Image upload failed:", result);

      // ✅ Check for Laravel validation errors
      if (result.errors && result.errors.image && Array.isArray(result.errors.image)) {
        toast.error(result.errors.image[0]);
      } else if (result.image && Array.isArray(result.image)) {
        toast.error(result.image[0]); 
      } else {
        toast.error(result?.message || "Failed to upload image.");
      }

      return;
    }
    
    // Button Disable to true
    setIsDisable(false);
    
    // ✅ Success
    setImageId(result.data.id);
    toast.success("Image uploaded successfully!", { autoClose: 1500 });

  } catch (error) {
    console.error("❌ Error uploading image:", error);
    toast.error("Image upload failed. Please try again.", { autoClose: 3000 });
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
                  placeholder="Enter Title..."
                  {...register("title", {
                    required: "The title field is required",
                  })}
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
                    onChange: handleFileChange, // ✅ Trigger upload correctly
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

              {/* Status */}
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
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

export default AdminServicesShow;
