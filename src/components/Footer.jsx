import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-content">

                {/* 1. Branding & Copyright */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <div className="footer-logo-mark" aria-hidden="true">FM</div>
                        <a href="/" className="footer-logo-text">FirstMate</a>
                    </div>
                    <p className="tagline">Personal assistance for the personal assistant.</p>
                    <p className="copyright">&copy; {new Date().getFullYear()} FirstMate AI. All rights reserved.</p>
                </div>

                {/* 2. Navigation Links */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#ourservice">Services</a></li>
                        <li><a href="#chat">Chat Demo</a></li>
                        <li><a href="#help">Help</a></li>
                    </ul>
                </div>

            </div>
        </footer>
    );
};

export default Footer;