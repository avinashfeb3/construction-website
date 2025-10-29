import React from 'react';
import AdminLayout from "./AdminLayout";
import AdminArticlesShow from './AdminArticles/AdminArticlesShow';

const AdminArticles = () => {
  return (
    <>
        <AdminLayout>
         <AdminArticlesShow/>
        </AdminLayout>
    
    </>
  )
}

export default AdminArticles;