import React from 'react';
import Layout from "../../components/layout";
import AboutImg from '../../assets/images/about-us.jpg';


const Home = () => {
  return (
    <>
      <Layout>
          {/* Banner Section Start */}
          <section className='section-1'>
            <div className='hero d-flex align-items-center'>
              <div className='container-fluid'>
                <div className='text-center'>
                  <span>Welcome UrbanScape Builders</span>
                  <h1>Crafting dreams with <br/> precision and excellence</h1>
                  <p>We excel at transform visions into reality through outstanding craftmanship and precise <br/> attention to detail. With years of experience and a dedication to quality.</p>
                  <div className='mt-4'>
                       <a className='btn btn-primary'>Contact Now</a>
                  <a className='btn btn-secondary ms-2'>View Projects</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Banner Section End */}

          {/* About Section Start */}
          <section className='section-2 py-5'>
            <div className="container py-5">
              <div className="row">
                <div className="col-md-6">
                  <img src={AboutImg} className='img-fluid'/>
                </div>
                <div className="col-md-6">
                  <span>about us</span>
                  <h2>Crafting structures that last a lifetime</h2>
                  <p className='my-1 py-1'>Building enduring structures requires a comprehensive approach that combines advanced materials, resilient design, routine maintenance, and sustainable practices. By drawing on historical insights and utilizing modern technology.</p>
                  <p className='my-1 py-1'>
                    Designing structures that stand the test of time involves a seamless blend of cutting-edge materials, durable design, ongoing upkeep, and eco-friendly practices. By combining lessons from the past with the power of modern technology.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* About Section End */}
      </Layout>
    
    </>
  )
}

export default Home;