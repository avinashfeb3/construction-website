import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

const AdminServicesShow = () => {
  const [services, setServices] = useState([]);

  // Services API Call Here
  const fetchServices = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/services`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };
      console.debug("Fetching services", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);
      setServices(result?.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Service Delete Function API Call Here
 const deleteService = async (id) => {
  if (confirm("Are you sure to delete this service?") === true) {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/services/${id}`;

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
        const newServices = services.filter((service) => service.id !== id);
        setServices(newServices);
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
      fetchServices();
    } catch (error) {}
  }
};


  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
          <h3>Services</h3>
          <Link to="/admin/services/create" className="btn btn-secondary mb-1 d-flex align-items-center">
            <IoIosAdd size={23} className="me-2" />
            <span>Create</span>
          </Link>
        </div>

        <div className="mx-3 px-3">
          <hr />
        </div>

        {/* Table Service show Section Start */}
        <div className="table-responsive mx-4 px-4">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {services &&
                services.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.title}</td>
                    <td>{service.slug}</td>
                    <td>{
                    (service.status == 1) ? 'Active' : 'Inactive'
                    }
                    </td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link to={`/admin/services/edit/${service.id}`} className="btn btn-primary btn-sm me-2" title="Edit">
                        <FaRegEdit/>
                      </Link>
                      <Link onClick={() => deleteService(service.id)} className="btn btn-danger btn-sm" title="Delete">
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

export default AdminServicesShow;
