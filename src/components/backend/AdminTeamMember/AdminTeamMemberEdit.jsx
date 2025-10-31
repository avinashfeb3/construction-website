import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import { useForm } from "react-hook-form";
import { apiUrl, token, getFileUrl } from "../../common/http";
import { toast } from "react-toastify";

const AdminTeamMemberEdit = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [teamMember, setTeamMember] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // ✅ Fetch team member data
  useEffect(() => {
    const fetchTeamMember = async () => {
      const authToken = token();
      if (!authToken) {
        toast.error("No token found. Please log in again.", { autoClose: 3000 });
        navigate("/admin/login");
        return;
      }

      try {
        const url = `${apiUrl.replace(/\/+$/, "")}/members/${params.id}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        const result = await res.json();
        console.log("Fetched team member:", result);

        if (!res.ok || !result.status || !result.data) {
          toast.error(result.message || "Team Member not found.", { autoClose: 2000 });
          return;
        }

        const data = result.data;

        // ✅ Map API data to form fields
        const mappedData = {
          name: data.name || "",
          job_title: data.job_title || "",
          linkedin_url: data.linkedin_url || "",
          facebook_url: data.facebook_url || "",
          status: data.status?.toString() || "1",
        };

        reset(mappedData);
        // ensure watch/setValue for the star control is in sync (numeric value)
        setValue("rating", data.rating != null ? Number(data.rating) : 0);
        setTeamMember(data);
        setContent(data.members || "");

        // ✅ Handle image preview
        let imgUrl = "";
        if (data.image) {
          imgUrl = data.image.startsWith("http")
            ? data.image
            : getFileUrl(`uploads/member/${data.image}`);
        } else if (data.image_url) {
          imgUrl = data.image_url;
        }

        if (imgUrl) setImagePreview(imgUrl);
        if (data.image_id) setImageId(data.image_id);
      } catch (error) {
        console.error("Error fetching team member:", error);
        toast.error("Failed to fetch team member details.", { autoClose: 2000 });
      }
    };

    fetchTeamMember();
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

      const updatedData = {
        ...data,
        content,
        image_id: imageId,
        // ensure rating is numeric in the payload
        rating: Number(watch("rating") || data.rating || 0),
      };
      const url = `${apiUrl.replace(/\/+$/, "")}/members/${params.id}`;

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
        toast.error(result.message || "Failed to update team member.", { autoClose: 2000 });
        return;
      }

      toast.success(result.message || "Team Member updated successfully!", { autoClose: 1500 });
      navigate("/admin/members");
    } catch (error) {
      console.error("Error updating team member:", error);
      toast.error("Failed to update team member.", { autoClose: 3000 });
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
            <h3>Edit Team Member</h3>
            <Link to="/admin/members" className="btn btn-secondary">
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
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  {...register("name", { required: "Name is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("name", val);
                    trigger("name");
                  }}
                />
              </div>

              {/* Designation */}
              <div className="mb-3">
                <label className="form-label">Designation</label>
                <input
                  type="text"
                  className={`form-control ${errors["job_title"] ? "is-invalid" : ""}`}
                  {...register("job_title", { required: "Designation is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("job_title", val);
                    trigger("job_title");
                  }}
                />
              </div>

              {/* Linkedin URL */}
              <div className="mb-3">
                <label className="form-label">Linkedin URL</label>
                <input
                  type="text"
                  className={`form-control ${errors.linkedin_url ? "is-invalid" : ""}`}
                  {...register("linkedin_url", { required: "Linkedin URL is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("linkedin_url", val);
                    trigger("linkedin_url");
                  }}
                />
              </div>
              {/* Facebook URL */}
              <div className="mb-3">
                <label className="form-label">Facebook URL</label>
                <input
                  type="text"
                  className={`form-control ${errors.facebook_url ? "is-invalid" : ""}`}
                  {...register("facebook_url", { required: "Facebook URL is required" })}
                  onChange={(e) => {
                    const val = e.target.value;
                    setValue("facebook_url", val);
                    trigger("facebook_url");
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

export default AdminTeamMemberEdit;
