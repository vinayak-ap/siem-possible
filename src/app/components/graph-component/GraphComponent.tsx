'use client';

import React, { useState } from 'react';
import './GraphComponent.css';
import PopupComponent from '../popup-component/PopupComponent';
import 'font-awesome/css/font-awesome.min.css';
import readData from '../../data/readData.json';

const GraphComponent: React.FC = () => {
    const dummyData = readData.ServiceData.modelObjects['SR::N::Mfg0BvrProcess..1.lvg$SWyBt5XnBC.hhrdqE2QJPZb_B.Qcgdq4U9JPZb_B.Group:/Thid_Q4pdq4U9JPZb_B.1...']
        .props.Mfg0used_equipment.uiValues;

    const Sidebar = () => (
        <aside className='sidebar'>
            <div className='sidebar-nav'>
                <img src='https://store-images.s-microsoft.com/image/apps.21913.863c1661-4a23-4ffe-b1c7-b4f77b333831.708cc5a7-7813-402c-a822-441051210520.e64bdc28-9190-4f59-ad4b-c36c6009df65.png' alt='Sidebar Icon' className='sidebar-logo' />
                <div className='nav-icons'>
                    <div className='nav-icon'>🏠</div>
                    <div className='nav-icon'>📄</div>
                    <div className='nav-icon'>⚙️</div>
                    <div className='nav-icon'>📊</div>
                </div>
            </div>
        </aside>
    );

    const Header = () => (
        <header className='header'>
            <h1 className='header-title'>Master Recipe Authoring</h1>
            <nav className='header-nav'>
                <span>Test</span>
                <span>Time Unit: second</span>
                <span>No Active ECN</span>
                <button className='header-button'>Options</button>
            </nav>
        </header>
    );

    const GraphNode = () => {
        const [showPopup, setShowPopup] = useState(false);

        const togglePopup = () => setShowPopup(!showPopup);

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
                {showPopup && <PopupComponent onClose={togglePopup} />}
            </main>
        );
    };

    return (
        <div className='app-container'>
            <Sidebar />
            <div className='main-container'>
                <Header />
                <div className='graph-container'>
                    <GraphNode />
                </div>
            </div>
        </div>
    );
};

export default GraphComponent;
