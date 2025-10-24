import React from 'react'
import Layout from '../../../layout';
import Hero from '../../../common/Hero';
import ProjectsGrid from './ProjectsGrid';

const Projects = () => {
  return (
    <>
        <Layout>
           {/* Projects Banner Section Start */}
           <Hero preheading={'Building Dreams, One Landmark at a Time'} heading={'Our Projects'} text={'At Urbscape Builders, we take pride in crafting spaces that redefine modern living. <br/> Each of our projects is a reflection of innovation, quality craftsmanship, and attention <br/> to detail blending aesthetics with functionality.'} />
           {/* Projects Banner Section End */}

           {/* Our Projects Section Start */}
           <ProjectsGrid/>
           {/* Our Projects Section End */}
        </Layout>
    </>
  )
}

export default Projects;