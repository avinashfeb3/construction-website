import React from 'react';
import Header from './common/Header'
import Footer from './common/Footer';


function Layout({children}) {
  return (
   <>
   <Header/>
        <div>{children}</div>
   <Footer/>
   </>
  )
}

export default Layout;