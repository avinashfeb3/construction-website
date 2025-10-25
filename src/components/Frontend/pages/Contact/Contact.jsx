import React from 'react'
import Layout from '../../../layout'
import Hero from '../../../common/Hero';
import ContactForm from '../../../Frontend/pages/Contact/ContactForm';

const Contact = () => {
  return (
    <>
        <Layout>
            {/* Contact Banner Section Start */}
            <div className="my-3 py-3">
             <Hero preheading={'Let’s Build Something Extraordinary Together'} heading={'Contact Us'} text={'Get in touch with Urbscape Builders our team is ready to help <br/> you bring your dream spaces to life with expertise, trust, and innovation.'} />
            </div>
            {/* Contact Banner Section End */}

            {/* Contact Form Section Start */}
            <ContactForm/>
            {/* Contact Form Section End */}
        </Layout>
    </>
  )
}

export default Contact;