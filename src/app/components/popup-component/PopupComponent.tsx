'use client';
 
import { GraphNode, suggestedEquipment, EquipmentRecord } from '../../helper/graph-helper';
import React, { useState,useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './PopupComponent.css';
// import listData from '../../helper/listData.json';
import equipmentData from '../../helper/equipmentData.json';
 
interface PopupComponentProps {
    selectedGraphNode: GraphNode | undefined;
    onClose: () => void;
    handleAssignEquipment: (equipment: EquipmentRecord) => void;
}
 
const PopupComponent: React.FC<PopupComponentProps> = ({ selectedGraphNode, onClose, handleAssignEquipment }) => {
    const [searchQuery, setSearchQuery] = useState('');
    //console.log(response,"hhhhh")
    // const [selectedGraphNode, setSelectedGraphNode] = useState<GraphNode>();
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentRecord | null>(null);
    const [response, setResponse] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
 
    const getFilteredEquipment = () => {
        return equipmentData.filter(item => item.equipment_name && item.equipment_name.toLowerCase().includes(searchQuery));
    };
 
    useEffect(() => {
        const fetchLLMData = async () => {
          setLoading(true);
          try {
            const res = await fetch("/api/llm", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                productiontype:'cost-efficient',
                setpoint: selectedGraphNode?.attributes[0].setpoint,
                operation:selectedGraphNode?.attributes[0].operation // Replace with your desired value
              })
            });
            console.log(res)
            const data = await res.json();
 
            let parsedResponse;
            try {
              parsedResponse = JSON.parse(data.result);
              setResponse(parsedResponse);
            } catch (error) {
              parsedResponse = data.result; // Fallback if it's not a stringified JSON
            }
     
          
 
          } catch (error) {
            console.error("Error fetching LLM response:", error);
          }
          setLoading(false);
        };
   
        fetchLLMData();
      }, []);
 
    const filteredEquipment = searchQuery ? getFilteredEquipment() : equipmentData;
 
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };
 
    const handleEquipmentSelect = (equipment: any) => {
        setSelectedEquipment(equipment === selectedEquipment ? null : equipment);
    };
 
    const handleAddClick = () => {
        if (selectedEquipment) {
            handleAssignEquipment(selectedEquipment);
            onClose(); // Optionally close the popup
        }
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <header className="popup-header">
                    <div>Add Equipment</div>
                </header>
                <div className="popup-body">
                    <ul>
                        <h3>Smart Suggestions</h3>
                        <hr className="attribute-separator" />
                        {
                            loading ? <p>Loading...</p> : 
                            <li
                                key={response?.equipment?.equipment_name}
                                className={selectedEquipment && selectedEquipment === response?.equipment ? 'selected' : ''}
                                onClick={() => handleEquipmentSelect(response?.equipment)}
                            >
                            
                                <h3 className="text-xl font-semibold">{response?.equipment}</h3>
                                <p>{response?.description}</p>
                            </li>
                        }
                    </ul>

                    <div className="search-box">
                        <input type="text" placeholder="Search equipment..." value={searchQuery} onChange={handleSearchChange} />
                        <button className="search-icon">🔍</button>
                    </div>

                    <table className="equipment-table">
                        <thead>
                            <tr>
                                <th>Equipment</th>
                                <th>Alternative Set Points</th>
                                <th>Estimated Cost Per Hour</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipment && filteredEquipment.length > 0 ? (
                                filteredEquipment.map((equipment: EquipmentRecord) => (
                                    <tr key={equipment.equipment_name} className={selectedEquipment && selectedEquipment.equipment_name === equipment.equipment_name ? 'selected' : ''}
                                        onClick={() => handleEquipmentSelect(equipment)}>
                                        <td>{equipment.equipment_name}</td>
                                        <td>{equipment.alternative_set_points}</td>
                                        <td>{equipment.estimated_operating_cost_per_hour_usd}</td>
                                    </tr>
                                ))
                            ) : (
                                <p>No equipment found</p>
                            )}
                        </tbody>
                    </table>
                    {/* <button className='add-button' onClick={handleAddClick} disabled={!selectedEquipment}>Add</button>
                    <button className="popup-close" onClick={onClose}>X</button> */}
                </div>
                <footer className="popup-footer">
                    <button className="add-button" onClick={handleAddClick} disabled={!selectedEquipment}>Add</button>
                </footer>
                <button className="popup-close" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default PopupComponent;
