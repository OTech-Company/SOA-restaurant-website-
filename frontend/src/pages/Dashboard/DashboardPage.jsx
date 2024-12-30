import React, { useState } from 'react';
import parcelIcon from '../../assets/bag_icon.png'; // Directly importing from assets
import profileIcon from '../../assets/basket_icon.png'; // Directly importing from assets
import settingsIcon from '../../assets/cross_icon.png'; // Directly importing from assets
import './DashboardPage.css';

const DashboardPage = () => {
  const [activeSection, setActiveSection] = useState('orders'); // Default section: View My Orders

  // Render content dynamically based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <p>Here are your recent orders and their statuses.</p>;
      case 'profile':
        return <p>View and update your profile information.</p>;
      case 'settings':
        return <p>Manage your account settings and preferences.</p>;
      default:
        return <p>Select an option from the menu.</p>;
    }
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar Menu */}
      <aside className="dashboard-sidebar">
        <nav>
          <ul>
            <li
              className={activeSection === 'orders' ? 'active' : ''}
              onClick={() => setActiveSection('orders')}
            >
              <img src={parcelIcon} alt="Orders Icon" className="menu-icon" />
              View My Orders
            </li>
            <li
              className={activeSection === 'profile' ? 'active' : ''}
              onClick={() => setActiveSection('profile')}
            >
              <img src={profileIcon} alt="Profile Icon" className="menu-icon" />
              View Profile
            </li>
            <li
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => setActiveSection('settings')}
            >
              <img src={settingsIcon} alt="Settings Icon" className="menu-icon" />
              Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header>
          <h1>Dashboard</h1>
        </header>
        <section>{renderContent()}</section>
      </main>
    </div>
  );
};

export default DashboardPage;
