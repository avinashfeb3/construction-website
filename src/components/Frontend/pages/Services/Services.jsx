import React from 'react'
import Layout from '../../../layout';
import Hero from '../../../common/Hero';
import ServicesGrid from './ServicesGrid';

const Services = () => {
  return (
    <>
        <Layout>
            {/* Services Banner Section Start */}
            <Hero preheading={'Our Expertise, Your Vision'} heading={'Services'} text={'At Urbanscape Builders, we offer a wide range of construction  <br/>and architectural services tailored to bring your dream projects to life.'} />
            {/* Services Banner Section End */}

            {/* Service Grid Section Start */}
           <ServicesGrid/>
            {/* Service Grid Section Start */}
        </Layout>
    </>
  )
}

export default Services;