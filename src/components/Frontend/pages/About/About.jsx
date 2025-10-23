import React from 'react'
import Layout from '../../../layout';
import AboutCommon from '../../../common/AboutCommon';
import AboutTeam from './AboutTeam';
import Hero from '../../../common/Hero';
const About = () => {
  return (
    <>
      <Layout>
        {/* About Banner Section Start */}
        <Hero preheading={'Quality. Integrity. Value.'} heading={'About Us'} text={'We excel at transforming visions into reality <br/> through outstanding craftsmanship and precise execution.'} />
        {/* About Banner Section End */}

        {/* About Us Section Start */}
        <AboutCommon/>
        {/* About Us Section End */}

        {/* Our Team Section Start */}
        <AboutTeam/>
        {/* Our Team Section End */}
      </Layout>
    
    </>
  )
}

export default About;