import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token, getFileUrl } from "../../common/http";
import { toast } from "react-toastify";

const AdminTestimonialsEdit = () => {
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

  // ✅ Fetch testimonial data
  useEffect(() => {
    const fetchTestimonials = async () => {
      const authToken = token();
      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      try {
        const url = `${apiUrl.replace(/\/+$/, "")}/testimonials/${params.id}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const result = await res.json();
        console.log("Fetched testimonial:", result);

        if (!res.ok || !result.status || !result.data) {
          toast.error(result.message || "Testimonial not found.", { autoClose: 2000 });
          return;
        }

        const data = result.data;

        // ✅ Map API data to form fields
        const mappedData = {
          testimonial: data.testimonial || "",
          citation: data.citation || "",
          designation: data.designation || "",
          status: data.status?.toString() || "1",
        };

        reset(mappedData);
        setService(data);
        setContent(data.testimonial || "");

        // ✅ Handle image preview
        let imgUrl = "";
        if (data.image) {
          imgUrl = data.image.startsWith("http")
            ? data.image
            : getFileUrl(`uploads/testimonials/${data.image}`);
        } else if (data.image_url) {
          imgUrl = data.image_url;
        }

        if (imgUrl) setImagePreview(imgUrl);
        if (data.image_id) setImageId(data.image_id);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        toast.error("Failed to fetch testimonial details.", { autoClose: 2000 });
      }
    };

    fetchTestimonials();
  }, [params.id, navigate, reset]);

  // 🚀 Handle form submit (update)
  const onSubmit = async (data) => {
    try {
      const authToken = token();
      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      const updatedData = { ...data, content, image_id: imageId };
      const url = `${apiUrl.replace(/\/+$/, "")}/testimonials/${params.id}`;

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

      if (!res.ok || !result.status) {
        toast.error(result.message || "Failed to update testimonial.", { autoClose: 2000 });
        return;
      }

      toast.success(result.message || "Testimonial updated successfully!", { autoClose: 1500 });
      navigate("/admin/testimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast.error("Failed to update testimonial.", { autoClose: 3000 });
    }
  };

  // 📷 Handle file upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return toast.error("Please select an image file.");

    // Preview image immediately
    setImagePreview(URL.createObjectURL(file));
    setIsDisable(true);

    const authToken = token();
    const formData = new FormData();
    formData.append("image", file);

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

      setIsDisable(false);
      setImageId(result.data.id);
      toast.success("Image uploaded successfully!", { autoClose: 1500 });
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed.", { autoClose: 2000 });
      setIsDisable(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mx-4 px-4 my-1 py-1">
        <div className="card shadow-sm border-0">
          <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
            <h3>Edit Testimonial</h3>
            <Link to="/admin/testimonials" className="btn btn-secondary">
              Back
            </Link>
          </div>
          <hr />

          <div className="mx-4 px-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Testimonial */}
              <div className="mb-3">
                <label className="form-label">Testimonial</label>
                <textarea
                  rows="4"
                  className={`form-control ${errors.testimonial ? "is-invalid" : ""}`}
                  {...register("testimonial", { required: "Testimonial is required" })}
                />
              </div>

              {/* Citation */}
              <div className="mb-3">
                <label className="form-label">Citation</label>
                <input
                  type="text"
                  className={`form-control ${errors.citation ? "is-invalid" : ""}`}
                  {...register("citation", { required: "Citation is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("citation", val);
                    trigger("citation");
                  }}
                />
              </div>

              {/* Designation */}
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className={`form-control ${errors.designation ? "is-invalid" : ""}`}
                  {...register("designation", { required: "Designation is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("designation", val);
                    trigger("designation");
                  }}
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="file" className="form-control" onChange={handleFileChange} />

                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Testimonial Preview"
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

              {/* Submit */}
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

export default AdminTestimonialsEdit;
