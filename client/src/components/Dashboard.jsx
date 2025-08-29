import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, PieChart } from '@mui/x-charts'; // ← ADD THIS IMPORT
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        console.log('API Response:', response.data); 
        setDashboardData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Board.</h2>
        </div>
        <nav className="sidebar-nav">
          {['dashboard', 'transactions', 'schedules', 'users', 'settings'].map((item) => (
            <button key={item} className="nav-item">
              <span className="nav-icon">
                {item === 'dashboard' ? '📊' : 
                 item === 'transactions' ? '💳' : 
                 item === 'schedules' ? '📅' : 
                 item === 'users' ? '👥' : '⚙️'}
              </span>
              <span className="nav-label">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
        </header>

        {/* Metrics Grid */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">💰</div>
            <div className="metric-info">
              <h3>Total Revenue</h3>
              <h2>${dashboardData?.revenue.toLocaleString()}</h2>
              <span className="trend positive">+23%</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📝</div>
            <div className="metric-info">
              <h3>Total Transactions</h3>
              <h2>{dashboardData?.transactions.toLocaleString()}</h2>
              <span className="trend positive">+13%</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">❤️</div>
            <div className="metric-info">
              <h3>Total Likes</h3>
              <h2>{dashboardData?.users.toLocaleString()}</h2>
              <span className="trend positive">+5%</span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-info">
              <h3>Total Users</h3>
              <h2>{dashboardData?.schedules.toLocaleString()}</h2>
              <span className="trend positive">+8%</span>
            </div>
          </div>
        </div>

        {/* CHARTS SECTION - THIS WAS MISSING */}
        <div className="charts-section">
          {/* Revenue Chart */}
          <div className="chart-card">
            <h3>Monthly Revenue</h3>
            <BarChart
              series={[{ data: [400, 300, 600, 800, 900, 1200, 1400] }]}
              height={300}
              xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>

          {/* Top Products Pie Chart */}
          <div className="chart-card">
            <h3>Top Products</h3>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 50, label: 'Basic Tees (50%)' },
                    { id: 1, value: 51, label: 'Custom Short Pants (51%)' },
                    { id: 2, value: 10, label: 'Super Hoodies (10%)' },
                  ],
                },
              ]}
              height={300}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;