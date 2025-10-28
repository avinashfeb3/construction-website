import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

const AdminProjectShow = () => {
  const [projects, setProjects] = useState([]);

  // Services API Call Here
  const fetchProjects = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/projects`;

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
      setProjects(result?.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Service Delete Function API Call Here
 const deleteService = async (id) => {
  if (confirm("Are you sure to delete this service?") === true) {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/projects/${id}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      if(result.success !== true){
        const newProjects = projects.filter((project) => project.id !== id);
        setProjects(newProjects);
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
      fetchProjects();
    } catch (error) {}
  }
};


  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
          <h3>Projects</h3>
          <Link to="/admin/projects/create" className="btn btn-secondary mb-1 d-flex align-items-center">
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
                <th>Construction Type</th>
                <th>Sector</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects &&
                projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>{project.slug}</td>
                    <td>{project.construction_type}</td>
                  <td>
                    {project.sector
                      ? typeof project.sector === "string"
                        ? project.sector
                        : project.sector.name
                      : ""}
                  </td>
                    <td>{project.location}</td>
                    <td>{
                    (project.status == 1) ? 'Active' : 'Inactive'
                    }
                    </td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-primary btn-sm me-2" title="Edit">
                        <FaRegEdit/>
                      </Link>
                      <Link onClick={() => deleteService(project.id)} className="btn btn-danger btn-sm" title="Delete">
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

export default AdminProjectShow;
