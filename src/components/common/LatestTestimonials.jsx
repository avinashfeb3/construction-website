import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { apiUrl, getFileUrl } from "./http";


const LatestTestimonials = () => {
   const [testimonials, setTestimonials] = useState([]);

       // Call Latest Testimonials API Section Start
   const fetchLatestTestimonials = async () => {
       const url = `${apiUrl.replace(/\/+$/, "")}/get-latest-testimonials`;

         const options = {
           method: "GET",
         };
   
         const res = await fetch(url, options);
         const result = await res.json();
         setTestimonials(result.data);
         // console.log(result);
         
   
         if (!res.ok) {
           console.error("HTTP Error:", res.status, result);
           throw new Error(result.message || `HTTP error ${res.status}`);
         }
   }
     useEffect(() => {
       fetchLatestTestimonials();
     },[]);

  return (
    <>
        <section className="section-5 py-5">
          <div className="container">
            <div className="section-header text-center">
              <span>our Testimonials</span>
              <h2>What people are saying about us</h2>
              <p>
                Our clients consistently praise us for our exceptional service,
                reliability, and attention to detail, <br /> highlighting how we
                go above and beyond to exceed expectations.
              </p>
            </div>
            {testimonials.length > 0 && (
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={50}
                slidesPerView={3}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  0: { slidesPerView: 1 }, // mobile
                  640: { slidesPerView: 1 }, // small screens
                  768: { slidesPerView: 2 }, // tablets
                  1024: { slidesPerView: 3 }, // desktop
                }}
              >
                {testimonials.map((item, idx) => {
                  const rating = Number(item.rating || 0);
                  let imgSrc = "";
                  if (item.image) {
                    const imgVal = String(item.image || "");
                    if (imgVal.startsWith("http")) {
                      imgSrc = imgVal;
                    } else if (imgVal.includes("uploads") || imgVal.startsWith("/")) {
                      // already a relative path on server
                      imgSrc = getFileUrl(imgVal);
                    } else {
                      // API returned a filename only - prepend the known uploads path
                      imgSrc = getFileUrl(`uploads/testimonials/${imgVal}`);
                    }
                  } else if (item.image_url) {
                    imgSrc = item.image_url;
                  }

                  const testimonialText = item.testimonial || item.content || item.message || "";
                  const name = item.citation || item.name || "Anonymous";
                  const designation = item.designation || "";

                  return (
                    <SwiperSlide key={`test-${idx}`}>
                      <div className="card shadow border-0">
                        <div className="card-body p-4">
                          <div className="ratings">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i key={i} className={`bi ${i < rating ? "bi-star-fill" : "bi-star"}`}></i>
                            ))}
                          </div>
                          <div className="content pt-4 pb-2">
                            <p>{testimonialText}</p>
                          </div>
                          <hr />
                          <div className="d-flex meta">
                            <div>
                              <img src={imgSrc} alt={name} className="img-fluid" width={50} />
                            </div>
                            <div className="ps-3">
                              <div className="name">{name}</div>
                              <div>{designation}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
        </section>
    </>
  )
}

export default LatestTestimonials;