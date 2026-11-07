import React, { useState } from 'react';
import Dropdown from './Dropdown'; 
import './Navbar.css';

// Define the structure of the menu data
const menuItems = [
    {
        title: "DASHBOARD",
        items: [
            { label: "Overview", link: "#overview" },
        ],
    },
    {
        title: "WORKFLOW & SCHEDULING",
        items: [
            { label: "Tasks & Reminders", link: "#tasks" },
            { label: "Calendar", link: "#calendar" },
            { label: "Bookings", link: "#bookings" },
        ],
    },
    {
        title: "NOTES & RECORDS",
        items: [
            { label: "Notes", link: "#notes" },
            { label: "Meeting Minutes", link: "#minutes" },
        ],
    },
    {
        title: "ACCOUNT & HELP",
        items: [
            { label: "Your Profile", link: "#profile" },
            { label: "Help", link: "#help" },
            { label: "Clear My Data", link: "#settings" },
        ],
    },
];


const Navbar = () => {
    // Controls the hamburger menu on small screens
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    {/* Logo Section */}
                    <div className="logo-section">
                        <div className="logo">FM</div>
                        <a href="/" className="logo-text">FirstMate</a>
                        <div className="tagLine">"The Assistant's Assistant"</div>
                    </div>

                    {/* Hamburger button - visible on phones only */}
                    <button
                        type="button"
                        className={`nav-toggle ${isMenuOpen ? 'open' : ''}`}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-menu"
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        <span className="nav-toggle-bar" />
                        <span className="nav-toggle-bar" />
                        <span className="nav-toggle-bar" />
                    </button>

                    {/* Menu - uses the data array to render dropdowns */}
                    <div
                        id="primary-menu"
                        className={`nav-menu ${isMenuOpen ? 'open' : ''}`}
                        onClick={(e) => {
                            // Close the phone menu after a link is chosen
                            if (e.target.closest('.dropdown-content a')) setIsMenuOpen(false);
                        }}
                    >
                        {menuItems.map((menu, index) => (
                            <Dropdown 
                                key={index}
                                title={menu.title}
                                items={menu.items}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;