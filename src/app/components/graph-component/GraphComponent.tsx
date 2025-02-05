'use client';

import React, { useState } from 'react';
import PopupComponent from '../popup-component/PopupComponent';
import { Equipment } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './GraphComponent.css';

const GraphComponent: React.FC = () => {

    const GraphNode = () => {
        const [showPopup, setShowPopup] = useState(false);
        const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
        const togglePopup = () => setShowPopup(!showPopup);

        const handleEquipmentSelection = (equipment: Equipment) => {
            setSelectedEquipment(equipment);
            setShowPopup(false); // Close the popup after selecting equipment
        };

        return (
            <main className='content'>
                <div className='card'>
                    <h2 className='card-title'>RUP</h2>
                    <button className='context-menu' onClick={togglePopup}>
                        <i className="fa fa-ellipsis-v"></i>
                    </button>
                </div>
                {showPopup && <PopupComponent onClose={togglePopup} onSelectEquipment={handleEquipmentSelection} />}
            </main>
        );
    };

    return (
        <div className='graph-container'>
            <GraphNode />
        </div>
    );
};

export default GraphComponent;
