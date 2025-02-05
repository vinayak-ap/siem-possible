'use client';

import React, { useState } from 'react';
import { allEquipment, suggestedEquipment, Equipment } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './PopupComponent.css';

interface PopupComponentProps {
    onClose: () => void;
    onSelectEquipment: (equipment: Equipment) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose, onSelectEquipment }) => {

    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    // const handleEquipmentSelect = (equipment: Equipment) => {
    //     setSelectedEquipment(equipment);
    //     onSelectEquipment(equipment); // Pass the selected equipment to the parent
    //     onClose(); // Close the popup after selection (optional)
    // };
    
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
                    <input type="text" placeholder="Search equipment..." />
                    <button className="search-icon">🔍</button>
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
                        {allEquipment.map((equipment) => (
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
