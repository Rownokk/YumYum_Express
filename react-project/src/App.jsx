import React from "react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/placeOrder/placeOrder"
import Footer from "./components/Footer/Footer"
const App = () => {
  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
