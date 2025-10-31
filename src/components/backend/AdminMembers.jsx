import React from 'react';
import AdminLayout from "./AdminLayout";
import AdminTeamMemberShow from './AdminTeamMember/AdminTeamMemberShow';

const AdminMembers = () => {
  return (
    <>
        <AdminLayout>
        <AdminTeamMemberShow/>
        </AdminLayout>
    
    </>
  )
}

export default AdminMembers;