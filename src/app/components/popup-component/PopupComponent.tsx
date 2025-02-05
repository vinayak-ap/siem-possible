import React from 'react';
import './PopupComponent.css';

interface PopupComponentProps {
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Suggested Equipment</h3>
        <ul>
          <li>Equipment A</li>
          <li>Equipment B</li>
          <li>Equipment C</li>
        </ul>
        <div className="search-box">
          <input type="text" placeholder="Search equipment..." />
          <button className="search-icon">🔍</button>
        </div>
        <table className="equipment-table">
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
        <button className="add-button">Add</button>
      </div>
      <button className="popup-close" onClick={onClose}>X</button>
    </div>
  );
};

export default PopupComponent;
