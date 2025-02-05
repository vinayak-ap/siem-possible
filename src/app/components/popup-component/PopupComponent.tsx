"use client"
import React, { useState } from 'react';
import './PopupComponent.css';
import listData from '../../data/listData.json';

interface PopupComponentProps {
  onClose: () => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const inData=listData.ServiceData.modelObjects
  const namesArray = Object.values(inData).map(obj => {
    const nameEntry = obj?.props?.awp0CellProperties?.dbValues.find((val: string) => val.startsWith("Name\\:"));
    return nameEntry ? nameEntry.split("\\:")[1] : null; // Extract value after "Name\:"
  }).filter(Boolean)

  
  // Filtered equipment names based on the search query, or an empty list if searchQuery is empty
  const filteredEquipment = searchQuery
    ? namesArray.filter((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []; // If searchQuery is empty, return an empty array
    // Handle change in search input
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  console.log(namesArray)
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
          <input  type="text"
          placeholder="Search equipment..."
          value={searchQuery}
          onChange={handleSearchChange} />
          <button className="search-icon">🔍</button>
        </div>
        <div className="search-results">
        {filteredEquipment.length >= 0 ? (
          <ul>
            {filteredEquipment.map((equipment, index) => (
              <li key={index}>{equipment}</li>
            ))}
          </ul>
        ) : (
          <p>No equipment found</p>
        )}
      </div>
        <table className="equipment-table">
          <thead>
            <tr>
              <th>Name</th>
             
            </tr>
          </thead>
          <tbody>
          {namesArray.map((item, index) => (
                            <tr key={index}>
                               <td>{item}</td> 
                            </tr>
                        ))}
          
          </tbody>
        </table>
        <button className="add-button">Add</button>
      </div>
      <button className="popup-close" onClick={onClose}>X</button>
    </div>
  );
};

export default PopupComponent;
