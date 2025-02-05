'use client';

import React, { useState } from 'react';
import PopupComponent from '../popup-component/PopupComponent';
import { EquipmentRecord, getEquipmentData } from '../../helper/equipment';
import 'font-awesome/css/font-awesome.min.css';
import './GraphComponent.css';
import readData from '../../data/readData.json';

const GraphComponent: React.FC = () => {
    const dummyData = getEquipmentData([readData.ServiceData.modelObjects['SR::N::Mfg0BvrProcess..1.lvg$SWyBt5XnBC.hhrdqE2QJPZb_B.Qcgdq4U9JPZb_B.Group:/Thid_Q4pdq4U9JPZb_B.1...']]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentRecord[]>(dummyData);
    const togglePopup = () => setShowPopup(!showPopup);
    const handleEquipmentSelection = (equipment: EquipmentRecord) => setSelectedEquipment((prevEquipment) => [...prevEquipment, equipment]);

    return (
        <div>
            <div className='graph-node'>
                <div className='graph-node-title'>Raw Material Preparation</div>
                <button className='context-menu' onClick={togglePopup}>
                    <i className="fa fa-ellipsis-v"></i>
                </button>

                <div className="attribute-container">
                    {selectedEquipment.map((item, index) => (
                        <div key={index} className="graph-node-attribute">
                            {item.object_string}
                        </div>
                    ))}
                </div>
            </div>
            {showPopup && <PopupComponent onClose={togglePopup} onSelectEquipment={handleEquipmentSelection} />}
        </div>
    );
};

export default GraphComponent;
