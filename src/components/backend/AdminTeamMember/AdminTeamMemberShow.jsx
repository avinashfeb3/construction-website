import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/http";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { toast } from "react-toastify";

const AdminTeamMemberShow = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Services API Call Here
  const fetchTeamMembers = async () => {
    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/members`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };
      console.debug("Fetching team members", { url, hasToken: !!authToken });

      const res = await fetch(url, options);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      // console.log("Services response:", result);
      setTeamMembers(result?.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Article Delete Function API Call Here
  const deleteTeamMember = async (id) => {
    if (confirm("Are you sure to delete this team member?") !== true) return;

    try {
      const authToken = token();
      const url = `${apiUrl.replace(/\/+$/, "")}/members/${id}`;

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      const res = await fetch(url, options);

      // try to parse JSON even on non-ok to show messages
      let result = null;
      try {
        result = await res.json();
      } catch (parseErr) {
        // ignore parse error
      }

      if (!res.ok) {
        const msg = result?.message || `HTTP error ${res.status}`;
        toast.error(msg || "Failed to delete team member.");
        return;
      }

      // Consider both `status` and `success` flags from API
      const okFlag = result?.status === true || result?.success === true || res.status === 200;

      if (okFlag) {
        // remove the deleted team member from local state immediately so no refresh required
        setTeamMembers((prev) => prev.filter((a) => a.id !== id));
        toast.success(result?.message || "Team member deleted successfully.");
      } else {
        toast.error(result?.message || "Failed to delete team member.");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast.error("Failed to delete team member.");
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <>
      <div className="card shadow-sm border-0">
        <div className="card-body d-flex justify-content-between align-items-center mx-3 px-3 mt-2 pt-2 mb-1 pb-1">
          <h3>Testimonials</h3>
          <Link to="/admin/members/create" className="btn btn-secondary mb-1 d-flex align-items-center">
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
                <th>Team Member Name</th>
                <th>Designation</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers &&
                teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.job_title}</td>
                    <td>{member.status}</td>
                    <td>{
                    (member.status == 1) ? 'Active' : 'Inactive'
                    }
                    </td>
                    <td className="d-flex flex-wrap gap-2">
                      <Link to={`/admin/members/edit/${member.id}`} className="btn btn-primary btn-sm me-2" title="Edit">
                        <FaRegEdit/>
                      </Link>
                      <Link onClick={() => deleteTeamMember(member.id)} className="btn btn-danger btn-sm" title="Delete">
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

export default AdminTeamMemberShow;
