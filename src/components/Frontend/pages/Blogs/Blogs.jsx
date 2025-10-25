import React from 'react'
import Layout from '../../../layout'
import Hero from '../../../common/Hero'
import BlogsGrid from './BlogsGrid'

const Blogs = () => {
  return (
    <>
        <Layout>
            {/* Blogs Banner Section Start */}
            <div className="my-4 py-4">
              <Hero preheading={'Insights, Inspiration & Innovation in Modern Living'} heading={'Our Blogs'} text={'Stay updated with the latest trends, ideas, and industry insights from Urbscape Builders. <br/> Our blog features expert perspectives on architecture, real estate, and sustainable <br/> construction helping you explore new possibilities in modern living.'} />
            </div>
            {/* Blogs Banner Section End */}

            {/* Blogs Grid Section Start */}
            <BlogsGrid/>
            {/* Blogs Grid Section End */}
        </Layout>
    </>
  )
}

export default Blogs