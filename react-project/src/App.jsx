import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/placeOrder/placeOrder"
const App = () => {
  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path='/'element = {<Home/>}/>
        
        <Route path='/cart'element ={<Cart/>}/>
        <Route path='/placeOrder'element ={<PlaceOrder/>}/>
        
      </Routes>
    </div>
  )
}

export default App
