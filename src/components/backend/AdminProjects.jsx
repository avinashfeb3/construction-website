import React from 'react';
import AdminLayout from "./AdminLayout";
// import AdminProjectCreate from './AdminProject/AdminProjectCreate';
import AdminProjectShow from './AdminProject/AdminProjectShow';

const AdminProjects = () => {
  return (
    <>
        <AdminLayout>
        {/* Show All Project Section Start */}
        <AdminProjectShow/>
        {/* Show All Project Section End */}
        </AdminLayout>
    
    </>
  )
}

export default AdminProjects;