
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer=()=>{
return(
    <div className='footer' id='footer'>
 <div className="footer-content">
    <div className="footer-content-left">
    <div className="logo-textt">
            <span className="logo-line">YumYum</span>
            <span className="logo-line0">Express</span>
          </div>
         <p>Delight at Your Doorstep. Bon Appétit!</p>
   <div className="footer-social-icons">
    <img src ={assets.facebook_icon}alt=""/>
    <img src ={assets.twitter_icon}alt=""/>
    <img src ={assets.linkedin_icon}alt=""/>
   </div>
     </div>
    
    <div className="footer-content-center">
        <h2>COMPANY</h2>
        <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
    </div>
    <div className="footer-content-right">
        <h2>
            GET IN TOUCH
        </h2>
        <ul> 
<li>+1-342-543-1234</li>
<li>contact@YumYum_Express.com</li>

        </ul>


    </div>
 </div>
 <hr/>
 <p className="footer-copyright">Copyright 2024 YumYum_Express.com-All Right Reserved.</p>
    </div>
)

}
export default Footer