'use client';

import React, { useState } from 'react';
import PopupComponent from '../popup-component/PopupComponent';
import { EquipmentRecord } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './GraphComponent.css';
import readData from '../../data/readData.json';

const GraphComponent: React.FC = () => {

    const GraphNode = () => {
        const dummyData = readData.ServiceData.modelObjects['SR::N::Mfg0BvrProcess..1.lvg$SWyBt5XnBC.hhrdqE2QJPZb_B.Qcgdq4U9JPZb_B.Group:/Thid_Q4pdq4U9JPZb_B.1...'].props.Mfg0used_equipment.uiValues;
        const [showPopup, setShowPopup] = useState(false);
        const [selectedEquipment, setSelectedEquipment] = useState<EquipmentRecord | null>(null);
        const togglePopup = () => setShowPopup(!showPopup);


        const handleEquipmentSelection = (equipment: EquipmentRecord) => {
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

                    {/* Tiles for Dummy Data */}
                    <div className="tile-container">
                        {dummyData.map((item, index) => (
                            <div key={index} className="tile">
                                {item}
                            </div>
                        ))}
                    </div>
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
