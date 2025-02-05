'use client';

import React, { useState } from 'react';
import { suggestedEquipment, EquipmentRecord, EquipmentVMO, getEquipmentData } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './PopupComponent.css';
import listData from '../../data/listData.json';

interface PopupComponentProps {
    onClose: () => void;
    onSelectEquipment: (equipment: EquipmentRecord) => void;
}

const PopupComponent: React.FC<PopupComponentProps> = ({ onClose, onSelectEquipment }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentRecord | null>(null);
    const equipmentData: EquipmentRecord[] = getEquipmentData(Object.values(listData.ServiceData.modelObjects) as unknown as EquipmentVMO[]);

    const getFilteredEquipment = () => {
        return equipmentData.filter(item => item.object_string && item.object_string.toLowerCase().includes(searchQuery));
    };

    const filteredEquipment = searchQuery ? getFilteredEquipment() : equipmentData;

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleEquipmentSelect = (equipment: EquipmentRecord) => {
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
                <ul>
                    <h3>Smart Suggestions</h3>
                    {suggestedEquipment.map((equipment: EquipmentRecord) => (
                        <li
                            key={equipment.uid}
                            className={selectedEquipment && selectedEquipment.uid === equipment.uid ? 'selected' : ''}
                            onClick={() => handleEquipmentSelect(equipment)}
                        >
                            {equipment.object_string}
                        </li>
                    ))}
                </ul>

                <div className="search-box">
                    <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={handleSearchChange} />
                    <button className="search-icon">🔍</button>
                </div>

                <table className="equipment-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEquipment && filteredEquipment.length > 0 ? (
                            filteredEquipment.map((equipment: EquipmentRecord) => (
                                <tr key={equipment.uid} className={selectedEquipment && selectedEquipment.uid === equipment.uid ? 'selected' : ''}
                                    onClick={() => handleEquipmentSelect(equipment)}>
                                    <td>{equipment.object_string}</td>
                                </tr>
                            ))
                        ) : (
                            <p>No equipment found</p>
                        )}
                    </tbody>
                </table>
                <button className='add-button' onClick={handleAddClick} disabled={!selectedEquipment}>Add</button>
                <button className="popup-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default PopupComponent;
