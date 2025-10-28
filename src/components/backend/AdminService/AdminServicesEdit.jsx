import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token, getFileUrl } from "../../common/http";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";

const AdminServicesEdit = ({ placeholder }) => {
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
    const fetchService = async () => {
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      const url = `${apiUrl.replace(/\/+$/, "")}/services/${params.id}`;

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
        
        if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);

            if (result.status === true && result.data) {
              reset(result.data);
              setContent(result.data.content || "");
              setService(result.data);

              // ✅ Set existing image for preview (robust fallback resolution)
              try {
                const resolveImageFromData = (obj) => {
                  if (!obj) return null;

                  // direct common keys
                  const keys = ['image', 'image_name', 'image_url', 'image_path', 'filename', 'file', 'path', 'url', 'thumbnail', 'thumb'];
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
                    if (typeof val === 'string') {
                      const s = val.toLowerCase();
                      if (s.includes('uploads/') || s.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return val;
                      if (s.startsWith('http')) return val;
                    }
                    if (typeof val === 'object') {
                      const found = resolveImageFromData(val);
                      if (found) return found;
                    }
                  }

                  return null;
                };

                const foundImg = resolveImageFromData(result.data);
                if (foundImg) {
                  let imageUrl = String(foundImg);
                  if (!imageUrl.startsWith('http')) {
                    // if it's a raw filename or a relative uploads path, normalize
                    if (imageUrl.includes('uploads/')) imageUrl = getFileUrl(imageUrl.replace(/^\/+/, ''));
                    else imageUrl = getFileUrl(`uploads/services/small/${imageUrl}`);
                  }
                  console.debug('Service image resolved to (fallback):', imageUrl);
                  setImagePreview(imageUrl);
                }
              } catch (e) {
                console.warn('Error resolving image URL', e);
              }

              if (result.data.image_id) setImageId(result.data.image_id);
        } else {
          toast.error(result.message || "Failed to fetch service details.", { autoClose: 2000 });
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        toast.error("An error occurred while fetching service details.", { autoClose: 2000 });
      }
    };

    fetchService();
  }, [params.id, navigate, reset]);

  // 🧩 Slug Generator
  const generateSlug = (text) =>
    text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");

  // 🚀 Handle Submit (Update Service)
  const onSubmit = async (data) => {
    try {
      const authToken = token();

      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      const updatedData = { ...data, content, imageId };
      const url = `${apiUrl.replace(/\/+$/, "")}/services/${params.id}`;

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

      if (!res.ok) throw new Error(result.message || `HTTP error ${res.status}`);

      if (result.status === true) {
        toast.success(result.message || "Service updated successfully!", { autoClose: 1500 });
        navigate("/admin/services");
      } else {
        toast.error(result.message || "Failed to update service.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Failed to update service.", { autoClose: 3000 });
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
    setIsDisable(true)

    try {
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
        toast.error(result?.message || "Failed to upload image.");
        return;
      }

    // Button Disable to true
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
            <h3>Edit Service</h3>
            <Link to="/admin/services" className="btn btn-secondary">
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
                  {...register("title", { required: "The title field is required" })}
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

              {/* Short Description */}
              <div className="mb-3">
                <label className="form-label">Short Description</label>
                <textarea
                  rows="4"
                  className={`form-control ${errors.short_desc ? "is-invalid" : ""}`}
                  {...register("short_desc", { required: "Short description is required" })}
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
                <input type="file" className="form-control" onChange={handleFileChange} />

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
                        src={getFileUrl(`uploads/services/small/${service.image}`)}
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

              {/* Status */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <button disabled={isDisable} className="btn btn-primary mb-3" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminServicesEdit;
