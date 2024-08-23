import React, { useState } from 'react';
import './Settings.css';
import axios from 'axios'; // Ensure you have this imported if making real API calls

const Settings = () => {
    const [username, setUsername] = useState("AdminUser");
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);
    const [loading, setLoading] = useState(false); // For handling the loading state
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handlePasswordChange = async () => {
        if (!password) {
            setError("Please enter a new password.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        // Simulate API call
        setTimeout(() => {
            // Simulate success response
            setLoading(false);
            setSuccess("Password changed successfully!");
            setPassword(""); // Clear the password field
        }, 2000);

        // In case of a real API call, you can use:
        // try {
        //     const response = await axios.post('/api/change-password', { password });
        //     setSuccess("Password changed successfully!");
        //     setPassword(""); // Clear the password field
        // } catch (error) {
        //     setError("Failed to change password.");
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <div className="settings-container">
            <h1 className="settings-title">Settings</h1>
            
            <div className="settings-section">
                <h2>Account Settings</h2>
                <form>
                    <div className="form-group">
                        <label>Username:</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password" 
                        />
                    </div>
                    <button 
                        type="button" 
                        className="settings-btn" 
                        onClick={handlePasswordChange}
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? "Changing..." : "Change Password"}
                    </button>

                    {/* Display success or error messages */}
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                </form>
            </div>

            <div className="settings-section">
                <h2>Notifications</h2>
                <form>
                    <div className="form-group">
                        <label>Email Notifications:</label>
                        <input 
                            type="checkbox" 
                            checked={emailNotifications} 
                            onChange={() => setEmailNotifications(!emailNotifications)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Push Notifications:</label>
                        <input 
                            type="checkbox" 
                            checked={pushNotifications} 
                            onChange={() => setPushNotifications(!pushNotifications)} 
                        />
                    </div>
                </form>
            </div>

            <div className="settings-section">
                <h2>Security Settings</h2>
                <form>
                    <div className="form-group">
                        <label>Two-Factor Authentication:</label>
                        <input 
                            type="checkbox" 
                            checked={twoFactorAuth} 
                            onChange={() => setTwoFactorAuth(!twoFactorAuth)} 
                        />
                    </div>
                    <div className="form-group">
                        <label>Login Alerts:</label>
                        <input 
                            type="checkbox" 
                            checked={loginAlerts} 
                            onChange={() => setLoginAlerts(!loginAlerts)} 
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
