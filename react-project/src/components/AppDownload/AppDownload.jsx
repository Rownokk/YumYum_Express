import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <div className="app-download-left">
                <img className='app-download-image' src={assets.touchscreen} alt="" />
                <div className="app-download-text">
                    <p className="app-download-subtitle">CHOOSE. EAT. ENJOY.</p>
                    <p className="app-download-description">
                        Nam liber tempor csoluta nobis eleifend option congue nihil imperdiet doming iquod mazim placerat facer possim assum lorem ipsum dolor possim assum lorem ipsum dolor.
                    </p>
                </div>
            </div>
            <div className="app-download-right">
                <div className="app-download-content">
                    <p className="app-download-title">Download the app</p>
                    <div className="app-download-platforms">
                        <img src={assets.play_store} alt="Download on Google Play" />
                        <img src={assets.app_store} alt="Download on the App Store" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppDownload;


