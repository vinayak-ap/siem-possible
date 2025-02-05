'use client';

import React, { useState } from 'react';
import { allEquipment, suggestedEquipment, Equipment } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './PopupComponent.css';
import listData from '../../data/listData.json';

interface PopupComponentProps {
    onClose: () => void;
    onSelectEquipment: (equipment: Equipment) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose, onSelectEquipment }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const inData = listData.ServiceData.modelObjects
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

    const handleEquipmentSelect = (equipment: Equipment) => {
        setSelectedEquipment(equipment === selectedEquipment ? null : equipment);
    };

    const handleAddClick = () => {
        if (selectedEquipment) {
            onSelectEquipment(selectedEquipment);
            onClose(); // Optionally close the popup
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Suggested Equipment</h3>
                <ul>
                    {suggestedEquipment.map((equipment) => (
                        <li
                            key={equipment.name}
                            className={selectedEquipment && selectedEquipment.name === equipment.name ? 'selected' : ''}
                            onClick={() => handleEquipmentSelect(equipment)}
                        >
                            {equipment.name}
                        </li>
                    ))}
                </ul>

                <div className="search-box">
                    <input type="text"
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
                <h3>All Equipment</h3>
                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {namesArray.map((equipment) => (
                            <tr key={equipment.name} className={selectedEquipment && selectedEquipment.name === equipment.name ? 'selected' : ''}
                                onClick={() => handleEquipmentSelect(equipment)}>
                                <td>{equipment.name}</td>
                                <td>{equipment.type}</td>
                                <td>{equipment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add-button' onClick={handleAddClick} disabled={!selectedEquipment}>Add Equipment</button>
            </div>
            <button className="popup-close" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

export default PopupComponent;
