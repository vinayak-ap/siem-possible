'use client';

import { useState } from 'react';
// import './App.scss';

const Sidebar = () => (
  <aside className='sidebar'>
    <div className='sidebar-nav'>
      <img src='https://store-images.s-microsoft.com/image/apps.21913.863c1661-4a23-4ffe-b1c7-b4f77b333831.708cc5a7-7813-402c-a822-441051210520.e64bdc28-9190-4f59-ad4b-c36c6009df65.png' alt='Sidebar Icon' className='sidebar-logo' />
      <div className='nav-icons'>
        <div className='nav-icon'>🏠</div>
        <div className='nav-icon'>📄</div>
        <div className='nav-icon'>⚙️</div>
        <div className='nav-icon'>📊</div>
      </div>
    </div>
  </aside>
);

const Header = () => (
  <header className='header'>
    <h1 className='header-title'>Master Recipe Authoring</h1>
    <nav className='header-nav'>
      <span>Test</span>
      <span>Time Unit: second</span>
      <span>No Active ECN</span>
      <button className='header-button'>Options</button>
    </nav>
  </header>
);

interface PopupComponentProps {
  onClose: () => void;
}

const PopupComponent = ({ onClose }: PopupComponentProps) => (
  <div className='popup'>
    <div className='popup-content'>
      <h3>Suggested Equipment</h3>
      <ul>
        <li>Equipment A</li>
        <li>Equipment B</li>
        <li>Equipment C</li>
      </ul>
      <div className='search-box'>
        <input type='text' placeholder='Search equipment...' />
        <button className='search-icon'>🔍</button>
      </div>
      <table className='equipment-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Equipment A</td>
            <td>Type 1</td>
            <td>Active</td>
          </tr>
          <tr>
            <td>Equipment B</td>
            <td>Type 2</td>
            <td>Inactive</td>
          </tr>
        </tbody>
      </table>
      <button className='add-button'>Add</button>
    </div>
    <button className='popup-close' onClick={onClose}>X</button>
  </div>
);

const Content = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <main className='content'>
      <div className='card card-styled'>
        <h2 className='card-title'>RUP</h2>
        <button className='three-dots-icon' onClick={togglePopup}>⋮</button>
      </div>
      {showPopup && <PopupComponent onClose={togglePopup} />}
    </main>
  );
};

export default function Home() {
  return (
    <div className='app-container'>
      <Sidebar />
      <div className='main-container'>
        <Header />
        <Content />
      </div>
    </div>
  );
}
