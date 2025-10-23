import React from 'react'
import AboutImg from "../../assets/images/about-us.jpg";

const AboutCommon = () => {
  return (
    <>
         {/* About Section Start */}
              <section className="section-2 py-5">
                <div className="container py-5">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        src={AboutImg}
                        className="img-fluid"
                        alt="About UrbanScape Builders"
                      />
                    </div>
                    <div className="col-md-6">
                      <span className="about-text">about us</span>
                      <h2>Crafting structures that last a lifetime</h2>
                      <p className="my-1 py-1">
                        Building enduring structures requires a comprehensive approach
                        that combines advanced materials, resilient design, routine
                        maintenance, and sustainable practices. By drawing on
                        historical insights and utilizing modern technology.
                      </p>
                      <p className="my-1 py-1">
                        Designing structures that stand the test of time involves a
                        seamless blend of cutting-edge materials, durable design,
                        ongoing upkeep, and eco-friendly practices. By combining
                        lessons from the past with the power of modern technology.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              {/* About Section End */}
    
    </>
  )
}

export default AboutCommon;