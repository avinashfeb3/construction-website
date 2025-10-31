import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/http";
import { toast } from "react-toastify";

const AdminTeamMemberCreate = () => {
  const [create, setCreate] = useState([]);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // ⚙️ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: { rating: 0 },
  });

  // 🚀 Form Submit Handler
  const onSubmit = async (data) => {
    try {
      const newData = { ...data, content, imageId, rating: watch("rating") };
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      const url = `${apiUrl.replace(/\/+$/, "")}/members`;

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
        if (result?.errors) {
          Object.values(result.errors).flat().forEach((msg) =>
            toast.error(msg, { autoClose: 3000 })
          );
        } else if (result?.message) {
          toast.error(result.message, { autoClose: 3000 });
        } else {
          toast.error(`HTTP error ${res.status}`, { autoClose: 3000 });
        }
        throw new Error(result.message || `HTTP error ${res.status}`);
      }

      if (result.status === true) {
        toast.success(result.message || "Team Member created successfully!", {
          autoClose: 1500,
        });

        // Reset form
        setCreate(result?.data || []);
        reset();
        setContent("");
        setImagePreview(null);
        setImageId(null);

        navigate("/admin/members");
      } else if (result.status === false) {
        if (result.errors) {
          Object.values(result.errors).flat().forEach((msg) =>
            toast.error(msg, { autoClose: 3000 })
          );
        } else {
          toast.error(result.message || "Failed to create team member.", {
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error("Failed to create team member.", { autoClose: 3000 });
    }
  };

  // 📸 Image Upload Handler
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
        navigate("/admin/login");
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

      if (!response.ok || result.status === false) {
        setIsDisable(false);
        if (result.errors?.image?.[0]) {
          toast.error(result.errors.image[0]);
        } else {
          toast.error(result.message || "Failed to upload image.");
        }
        return;
      }

      setIsDisable(false);
      setImageId(result.data.id);
      toast.success("Image uploaded successfully!", { autoClose: 1500 });
    } catch (error) {
      setIsDisable(false);
      toast.error("Image upload failed. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-4 px-4 my-1 py-1">
        <div className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
            <h3>Create Team Members</h3>
            <div className="d-flex mb-3 mt-2">
              <Link
                to="/admin/members"
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
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter Name..."
                  {...register("name", {
                    required: "The name field is required",
                  })}
                />
                {errors.name && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Designation */}
              <div className="mb-3">
                <label htmlFor="job_title" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  id="job_title"
                  className={`form-control ${errors.job_title ? "is-invalid" : ""}`}
                  placeholder="Enter Job Title..."
                  {...register("job_title", {
                    required: "The job title field is required",
                  })}
                />
                {errors.job_title && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.job_title.message}
                  </p>
                )}
              </div>

              {/* Linkedin */}
              <div className="mb-3">
                <label htmlFor="linkedin_url" className="form-label">
                  Linkedin
                </label>
                <input
                  type="text"
                  id="linkedin_url"
                  className={`form-control ${errors.linkedin_url ? "is-invalid" : ""}`}
                  placeholder="Enter Linkedin URL..."
                  {...register("linkedin_url")}
                />
                {errors.linkedin_url && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.linkedin_url.message}
                  </p>
                )}
              </div> 
              
              {/* Facebook */}
              <div className="mb-3">
                <label htmlFor="facebook_url" className="form-label">
                  Facebook
                </label>
                <input
                  type="text"
                  id="facebook_url"
                  className={`form-control ${errors.facebook_url ? "is-invalid" : ""}`}
                  placeholder="Enter Facebook URL..."
                  {...register("facebook_url")}
                />
                {errors.facebook_url && (
                  <p className="text-danger mt-2 invalid-feedback">
                    {errors.facebook_url.message}
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

                {/* Preview Image */}
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

export default AdminTeamMemberCreate;
