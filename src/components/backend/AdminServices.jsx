import React from 'react';
import AdminLayout from "./AdminLayout";
import AdminServicesShow from './AdminService/AdminServicesShow';

const AdminServices = () => {
  return (
    <>
        <AdminLayout>
        {/* Admin Service Show List Section Start */}
        <div className='my-2 py-2 mx-3 px-3'>
        <AdminServicesShow />
        </div>
        {/* Admin Service Show List Section End */}
        </AdminLayout>
    
    </>
  )
}

export default AdminServices;