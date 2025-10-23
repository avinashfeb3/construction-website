import React from "react"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./components/Frontend/pages/Home/Home";
import About from "./components/Frontend/pages/About/About";
import Services from "./components/Frontend/pages/Services/Services";
import Projects from "./components/Frontend/pages/Projects/Projects";
import Blogs from "./components/Frontend/pages/Blogs/Blogs";
import Contact from "./components/Frontend/pages/Contact/Contact";

function App() {

  return (
       <Router>
        <Routes>  
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/services' element={<Services/>}></Route>
            <Route path='/projects' element={<Projects/>}></Route>
            <Route path='/blogs' element={<Blogs/>}></Route>
            <Route path='/contact' element={<Contact/>}></Route>

        </Routes>
    </Router>  
  )
}

export default App
