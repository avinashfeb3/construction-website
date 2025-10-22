import React from "react"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from "./components/Frontend/Home";
import About from "./components/Frontend/About";

function App() {

  return (
       <Router>
        <Routes>  
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
        </Routes>
    </Router>  
  )
}

export default App
