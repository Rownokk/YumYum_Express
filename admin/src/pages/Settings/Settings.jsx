// src/pages/Settings/Settings.js
import React from 'react';
import './Settings.css';

const Settings = () => {
    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            <div className="settings-section">
                <h2>Account Settings</h2>
                <form>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" value="AdminUser" disabled />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value="admin@example.com" disabled />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" placeholder="********" disabled />
                    </div>
                    <button className="settings-btn" disabled>Change Password</button>
                </form>
            </div>

            <div className="settings-section">
                <h2>Notifications</h2>
                <form>
                    <div className="form-group">
                        <label>Email Notifications:</label>
                        <input type="checkbox" checked disabled />
                    </div>
                    <div className="form-group">
                        <label>Push Notifications:</label>
                        <input type="checkbox" checked disabled />
                    </div>
                </form>
            </div>

            <div className="settings-section">
                <h2>Security Settings</h2>
                <form>
                    <div className="form-group">
                        <label>Two-Factor Authentication:</label>
                        <input type="checkbox" disabled />
                    </div>
                    <div className="form-group">
                        <label>Login Alerts:</label>
                        <input type="checkbox" checked disabled />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
