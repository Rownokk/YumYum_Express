import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <div className="logo-textt">
                        <span className="logo-line">YumYum</span>
                        <span className="logo-line0">Express</span>
                    </div>
                    <p>Delight at Your Doorstep. Bon Appétit!</p>
                    <div className="footer-social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/facebook-icon-lower-third-design-template-2c2951e75c681b1dd5baec3f08078607_screen.jpg?ts=1655212723" alt="Facebook"/>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://png.pngtree.com/png-clipart/20190613/original/pngtree-twitter-icon-logo-png-image_3560522.jpg" alt="Twitter"/>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://png.pngtree.com/element_our/md/20180506/md_5aeedf924a6c8.jpg" alt="LinkedIn"/>
                        </a>
                        <a href="https://github.com/Rownokk/YumYum_Express.git" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn4.iconfinder.com/data/icons/social-media-and-logos-11/32/Logo_Github-512.png" alt="GitHub"/>
                        </a>
                    </div>
                </div>
                
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/delivery">Delivery</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                    </ul>
                </div>
                
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+1-342-543-1234</li>
                        <li>contact@YumYum_Express.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">Copyright 2024 YumYum_Express.com - All Right Reserved.</p>
        </div>
    );
}

export default Footer;
