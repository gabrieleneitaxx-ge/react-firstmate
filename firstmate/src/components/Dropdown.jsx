import React, { useState, useEffect, useRef } from 'react';

// This component manages the state (open/closed) for a single dropdown menu.
const Dropdown = ({ title, items }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    
    // 1. Create the reference to the root element
    const dropdownRef = useRef(null); 

    // Function to close the dropdown 
    const closeDropdown = () => setIsOpen(false);

    // Function to handle the click on the main title (Toggle)
    const toggleDropdown = (e) => {
        e.preventDefault(); 
        setIsOpen(prev => !prev);
    };

    // 2. Handle click outside logic
    const handleClickOutside = (event) => {
        // Check if the ref exists AND if the click target is NOT inside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            closeDropdown();
        }
    };
    
    // 3. Attach and clean up the global listener
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // The return statement must contain the entire JSX structure 
    return (
        <div 
            className="dropdown" 
            ref={dropdownRef} // Attach the ref here!
        >
            {/* The main button/link for the dropdown */}
            <a 
                href="#" 
                className="dropdown-btn" 
                onClick={toggleDropdown}
                aria-expanded={isOpen}
                aria-controls={`dropdown-content-${title.replace(/\s/g, '-')}`}
            >
                {title} 
                <span className="dropdown-arrow">{isOpen ? ' ▲' : ' ▼'}</span>
            </a>

            {/* The dropdown content, only visible when isOpen is true */}
            {isOpen && (
                <div 
                    className="dropdown-content"
                    id={`dropdown-content-${title.replace(/\s/g, '-')}`}
                >
                    {items.map((item, index) => (
                        <a 
                            key={index} 
                            href={item.link}
                            // Close the dropdown when an internal link is clicked 
                            onClick={closeDropdown} 
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;