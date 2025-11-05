import React, { useState } from 'react';
import Dropdown from './Dropdown'; 
import './Navbar.css';

// Define the structure of the menu data
const menuItems = [
    {
        title: "DASHBOARD",
        items: [
            { label: "Overview", link: "#overview" },
            { label: "Activity", link: "#activity" },
            { label: "Settings", link: "#settings" },
        ],
    },
    {
        title: "WORKFLOW & SCHEDULING", 
        items: [
            { label: "Tasks", link: "/tasks" },
            { label: "Calendar", link: "/calendar" },
            { label: "Reminders", link: "/reminders" },
        ],
    },
    {
        title: "NOTES & DOCUMENTS",
        items: [
            { label: "Notes", link: "/notes" },
            { label: "Documents", link: "/documents" },
            { label: "Tags", link: "#tags" },
        ],
    },
    {
        title: "PROFILE & HELP",
        items: [
            { label: "Your Profile", link: "/profile" },
            { label: "Helpdesk", link: "/helpdesk" },
            { label: "Logout", link: "#logout" },
        ],
    },
];


const Navbar = () => {
    // You could add state here later for a mobile menu toggle
    // const [isMenuOpen, setIsMenuOpen] = useState(false); 

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

                    {/* Desktop Menu - uses the data array to render dropdowns */}
                    <div className="nav-menu">
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