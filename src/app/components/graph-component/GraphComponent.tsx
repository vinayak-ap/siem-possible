'use client';

import React, { useState } from 'react';
import PopupComponent from '../popup-component/PopupComponent';
import { GraphNode, EquipmentRecord } from '../../helper/graph-helper';
import './GraphComponent.css';
import 'font-awesome/css/font-awesome.min.css';
// import readData from '../../helper/readData.json';
import graphData from '../../helper/graphData.json';

const GraphComponent: React.FC = () => {
    // const dummyData = getEquipmentData([readData.ServiceData.modelObjects['SR::N::Mfg0BvrProcess..1.lvg$SWyBt5XnBC.hhrdqE2QJPZb_B.Qcgdq4U9JPZb_B.Group:/Thid_Q4pdq4U9JPZb_B.1...']]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedGraphNode, setSelectedGraphNode] = useState<GraphNode>();
    // const [selectedEquipment, setSelectedEquipment] = useState<EquipmentRecord[]>(dummyData);
    const togglePopup = () => setShowPopup(!showPopup);
    
    const handleGraphNodeSelection = (selectedGraphNode: GraphNode) => {
        setSelectedGraphNode(selectedGraphNode);
        togglePopup();
    }

    const handleAssignEquipment = (equipment: EquipmentRecord) => selectedGraphNode.attributes.push(equipment);
    const getAttributeClass = (item: object) => item.type === 'capability' ? 'graph-node-attribute capability' : 'graph-node-attribute equipment';

    return (
        <>
            {graphData.map(node => (
                <div key={node.uid} className='graph-node'>
                    <div className='graph-node-title'>{node.title}</div>
                    <button className='context-menu' onClick={() => handleGraphNodeSelection(node as GraphNode)}>
                        <i className="fa fa-ellipsis-v"></i>
                    </button>

                    <div className="attribute-container">
                        {/* {node.attributes.map((item, index) => (
                            <div key={index} className="graph-node-attribute">
                                {item.type === 'capability' ? item.name : item.equipment_name}
                            </div>
                        ))} */}
                        {node.attributes.map((item, index) => (
                            <div key={index} className={getAttributeClass(item)}>
                            {item.type === 'capability' ? (
                                <>
                                <div>{item.name}</div>
                                <hr className="attribute-separator" />
                                <div>{item.setpoint}</div>
                                <div>{item.operation}</div>
                                </>
                            ) : (
                                <div>{item.equipment_name}</div>
                            )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {showPopup && <PopupComponent selectedGraphNode={selectedGraphNode} onClose={togglePopup} handleAssignEquipment={handleAssignEquipment} />}
        </>
    );
};

export default GraphComponent;
