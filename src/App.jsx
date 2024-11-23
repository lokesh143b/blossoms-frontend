import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import Pay from './pages/Pay/Pay'

const App = () => {
  return (
    <div className='app-container'>
      <Navbar />
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/pay' element={<Pay/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App