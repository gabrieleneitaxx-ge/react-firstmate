import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Icons for social links
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="container footer-content">
                
                {/* 1. Branding & Copyright */}
                <div className="footer-brand">
                    <h3>FirstMate 🤖</h3>
                    <p className="tagline">Personal assistance for the personal assistant.</p>
                    <p className="copyright">&copy; {new Date().getFullYear()} FirstMate AI. All rights reserved.</p>
                </div>
                
                {/* 2. Navigation Links (Example) */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#ourservice">Services</a></li>
                        <li><a href="#chat">Chat Demo</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* 3. Social Media Platforms */}
                <div className="footer-social">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        {/* Replace '#' with your actual platform URLs */}
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                    </div>
                    <p>Follow our journey.</p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;