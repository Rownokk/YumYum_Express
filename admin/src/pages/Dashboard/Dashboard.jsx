import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h2 className="dashboard-title">Admin Dashboard</h2>
            <div className="dashboard-cards">
                <div className="card">
                    <h3>Total Sales</h3>
                    <p>$12,345</p>
                </div>
                <div className="card">
                    <h3>New Orders</h3>
                    <p>24</p>
                </div>
                <div className="card">
                    <h3>Pending Shipments</h3>
                    <p>8</p>
                </div>
                <div className="card">
                    <h3>Active Users</h3>
                    <p>150</p>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="chart">
                    <h3>Sales Overview</h3>
                    <img src="https://via.placeholder.com/400x300" alt="Sales Chart" />
                </div>
                <div className="chart">
                    <h3>User Growth</h3>
                    <img src="https://via.placeholder.com/400x300" alt="User Growth Chart" />
                </div>
            </div>

            <div className="dashboard-recent">
                <h3>Recent Orders</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1001</td>
                            <td>John Doe</td>
                            <td>$250</td>
                            <td>Shipped</td>
                        </tr>
                        <tr>
                            <td>#1002</td>
                            <td>Jane Smith</td>
                            <td>$150</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>#1003</td>
                            <td>Mike Johnson</td>
                            <td>$300</td>
                            <td>Delivered</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
