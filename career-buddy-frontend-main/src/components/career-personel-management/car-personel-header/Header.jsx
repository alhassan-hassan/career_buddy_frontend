import React, {useState} from 'react';
import "./Header.scss";

const Header = ({showButtons, adminClick, cpaClick, adminback, admincolor, cpaback, cpacolor, handleAddPersonnel, search, getPersonnelSearch}) => {
    return (
        <div className="career-header" >
            <div className='header-top'>
                <div className='declare-car'>Career Personnel Management</div>
                <div className='search-car'>
                    <button 
                        id='add-personnel'
                        onClick={handleAddPersonnel}>
                        Add Personnel</button>
                </div>
            </div>

            <div className='list-specifics'>
                {!showButtons && 
                (
                <div className='car-type'>
                    <div className='option' 
                        style={{background : adminback, color: admincolor}}
                        onClick={adminClick}>
                        Admin
                    </div>
                    <div className='option' id='admin-'
                        style={{background : cpaback, color: cpacolor}}
                        onClick={cpaClick}>
                        CPA
                    </div> 
                </div>
                )}
                {showButtons && 
                (
                <div className='car-message'>
                    Add from Existing Students
                </div>
                )}
                <input type="search" placeholder='Search...' onChange={getPersonnelSearch} value = {search}/>
            </div>
        </div>
    );
    };

export default Header;