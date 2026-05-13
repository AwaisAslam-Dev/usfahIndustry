import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'
const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/productdetails/:productid' element={<ProductDetails/>}/>
      
    </Routes>
    <FloatingWhatsapp/>
    <Footer/>
    </>
  )
}
export default App
