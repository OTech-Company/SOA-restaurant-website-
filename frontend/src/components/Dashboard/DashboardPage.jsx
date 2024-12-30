// DashboardPage.jsx
import React from 'react';
import assets from '../assets'; // Importing centralized assets
import './DashboardPage.css'; // Optional CSS file for styling

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Header Section */}
      <header className="dashboard-header">
        <img src={assets.images.logo} alt="Logo" className="dashboard-logo" />
        <h1>Dashboard</h1>
      </header>

      {/* Metrics Section */}
      <section className="dashboard-metrics">
        <div className="metric-card">
          <h3>Total Orders</h3>
          <p>1,245</p>
        </div>
        <div className="metric-card">
          <h3>Revenue</h3>
          <p>$15,430</p>
        </div>
        <div className="metric-card">
          <h3>Customer Satisfaction</h3>
          <p>92%</p>
        </div>
      </section>

      {/* Top Dishes Section */}
      <section className="dashboard-top-dishes">
        <h2>Top Selling Dishes</h2>
        <div className="dish-list">
          {assets.images.food.slice(0, 5).map((image, index) => (
            <div key={index} className="dish-card">
              <img src={image} alt={`Top Dish ${index + 1}`} />
              <p>Dish {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Analytics Section */}
      <section className="dashboard-categories">
        <h2>Category Analytics</h2>
        <div className="category-list">
          {Object.keys(assets.icons).slice(0, 5).map((iconKey, index) => (
            <div key={index} className="category-card">
              <img src={assets.icons[iconKey]} alt={`Category ${index + 1}`} />
              <p>Category {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="dashboard-footer">
        <p>&copy; 2024 Restaurant Dashboard. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DashboardPage;
