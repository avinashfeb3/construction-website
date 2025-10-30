import React from "react";
import AdminLayout from "./AdminLayout";
import AdminTestimonialsShow from "./AdminTestimonials/AdminTestimonialsShow";

const AdminTestimonials = () => {
  return (
    <>
      <AdminLayout>
        {/* Admin Testimonials Show List Section Start */}
        <div className="my-2 py-2 mx-3 px-3">
          <AdminTestimonialsShow />
        </div>
        {/* Admin Service Show List Section End */}
      </AdminLayout>
    </>
  );
};

export default AdminTestimonials;
