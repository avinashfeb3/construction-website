import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token, getFileUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const AdminProjecEdit = ({ placeholder }) => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [service, setService] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  // Jodit Editor Config
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder]
  );

  // ✅ Fetch Service Data
  useEffect(() => {
    const fetchProjects = async () => {
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", {
          autoClose: 3000,
        });
        navigate("/admin/login");
        return;
      }

      const url = `${apiUrl.replace(/\/+$/, "")}/projects/${params.id}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const result = await res.json();
        console.log(result);

        if (!res.ok)
          throw new Error(result.message || `HTTP error ${res.status}`);

        if (result.status === true && result.data) {
          reset(result.data);
          setContent(result.data.content || "");
          setService(result.data);

          // ✅ Set existing image for preview (robust fallback resolution)
          try {
            const resolveImageFromData = (obj) => {
              if (!obj) return null;

              // direct common keys
              const keys = [
                "image",
                "image_name",
                "image_url",
                "image_path",
                "filename",
                "file",
                "path",
                "url",
                "thumbnail",
                "thumb",
              ];
              for (const k of keys) {
                if (obj[k]) return obj[k];
              }

              // if obj is an array, check elements
              if (Array.isArray(obj)) {
                for (const el of obj) {
                  const found = resolveImageFromData(el);
                  if (found) return found;
                }
              }

              // shallow search in object properties
              for (const val of Object.values(obj)) {
                if (!val) continue;
                if (typeof val === "string") {
                  const s = val.toLowerCase();
                  if (
                    s.includes("uploads/") ||
                    s.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)
                  )
                    return val;
                  if (s.startsWith("http")) return val;
                }
                if (typeof val === "object") {
                  const found = resolveImageFromData(val);
                  if (found) return found;
                }
              }

              return null;
            };

            const foundImg = resolveImageFromData(result.data);
            if (foundImg) {
              let imageUrl = String(foundImg);
              if (!imageUrl.startsWith("http")) {
                // if it's a raw filename or a relative uploads path, normalize
                if (imageUrl.includes("uploads/"))
                  imageUrl = getFileUrl(imageUrl.replace(/^\/+/, ""));
                else
                  imageUrl = getFileUrl(`uploads/projects/small/${imageUrl}`);
              }
              console.debug("Project image resolved to (fallback):", imageUrl);
              setImagePreview(imageUrl);
            }
          } catch (e) {
            console.warn("Error resolving image URL", e);
          }

          if (result.data.image_id) setImageId(result.data.image_id);
        } else {
          toast.error(result.message || "Failed to fetch projects details.", {
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("An error occurred while fetching project details.", {
          autoClose: 2000,
        });
      }
    };

    fetchProjects();
  }, [params.id, navigate, reset]);

  // 🧩 Slug Generator
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  // 🚀 Handle Submit (Update Service)
  const onSubmit = async (data) => {
    try {
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", {
          autoClose: 3000,
        });
        navigate("/admin/login");
        return;
      }

      const updatedData = { ...data, content, imageId };
      const url = `${apiUrl.replace(/\/+$/, "")}/projects/${params.id}`;

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (!res.ok)
        throw new Error(result.message || `HTTP error ${res.status}`);

      if (result.status === true) {
        toast.success(result.message || "Project updated successfully!", {
          autoClose: 1500,
        });
        navigate("/admin/projects");
      } else {
        toast.error(result.message || "Failed to update project.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project.", { autoClose: 3000 });
    }
  };

  // 📷 Handle File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select an image file.");

    // Show preview immediately
    setImagePreview(URL.createObjectURL(file));

    const authToken = token();
    const formData = new FormData();
    formData.append("image", file);
    
    // Button enable to disable 
      setIsDisable(true)

    try {
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

      if (!response.ok || result.status === false) {
        toast.error(result?.message || "Failed to upload image.");
        return;
      }

      // Button diable to enable 
      setIsDisable(false)

      setImageId(result.data.id);
      toast.success("Image uploaded successfully!", { autoClose: 1500 });
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed.", { autoClose: 2000 });
    }
  };

  return (
    <AdminLayout>
      <div className="mx-4 px-4 my-1 py-1">
        <div className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
            <h3>Service</h3>
            <Link to="/admin/projects" className="btn btn-secondary">
              Back
            </Link>
          </div>
          <hr />

          <div className="mx-4 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? "is-invalid" : ""}`}
                  {...register("title", {
                    required: "The title field is required",
                  })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("title", val);
                    setValue("slug", generateSlug(val));
                    trigger("title");
                  }}
                />
              </div>

              {/* Slug */}
              <div className="mb-3">
                <label className="form-label">Slug</label>
                <input
                  type="text"
                  className={`form-control ${errors.slug ? "is-invalid" : ""}`}
                  {...register("slug", { required: "Slug is required" })}
                  readOnly
                />
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
                      <option value="Education">Education</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Residential">Residential</option>
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
                <label className="form-label">Short Description</label>
                <textarea
                  rows="4"
                  className={`form-control ${
                    errors.short_desc ? "is-invalid" : ""
                  }`}
                  {...register("short_desc", {
                    required: "Short description is required",
                  })}
                />
              </div>

              {/* Content */}
              <div className="mb-3">
                <label className="form-label">Content</label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => {
                    setContent(newContent);
                    setValue("content", newContent);
                    trigger("content");
                  }}
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                />

                {/* ✅ Display current image or uploaded preview */}
                {imagePreview ? (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Service Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  </div>
                ) : (
                  service?.image && (
                    <div className="mt-3">
                      <img
                        src={getFileUrl(
                          `uploads/services/small/${service.image}`
                        )}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </div>
                  )
                )}
              </div>

              {/* Update Button */}
              <button
                disabled={isDisable}
                className="btn btn-primary mb-3"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjecEdit;
