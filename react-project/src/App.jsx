import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/placeOrder/placeOrder"
import Footer from "./components/Footer/Footer"
import { useState } from "react"
import About from './pages/About/About';
import Delivery from './pages/Delivery/Delivery';
import Privacy from './pages/Privacy/Privacy';
import LoginPopup from "./components/LoginPopup/LoginPopup"
const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/about' element={<About />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/privacy' element={<Privacy />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
