import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel'; // Will create this next
import './Hero.css';

const Hero = () => {
    // Placeholder for the typing text logic 
    // For a real typing effect, you'd use a useEffect hook 
    // and/or a library like 'react-typed' or 'typewriter-effect'.
    const typedPhrases = [
        "Handling repetitive tasks.", 
        "Filtering communication noise.", 
        "Providing backup support.",
        "Automating workflows.",
    ];
    const [typedText, setTypedText] = useState(typedPhrases[0]);
    
    // (A simple rotation for demonstration, not a true typing effect)
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % typedPhrases.length;
            setTypedText(typedPhrases[index]);
        }, 3000); // Change phrase every 3 seconds

        return () => clearInterval(interval);
    }, []);


    return (
        <section className="hero"> 
            <ImageCarousel />
            
            {/* 2. Foreground Content */}
            <div className="hero-content">
                <h1>
                    Achieve More With Less Effort...
                    <br />
                    Thanks to <span className="highlight">FirstMate</span>
                </h1>
                
                {/* Typing Section */}
                <div className="typing-container">
                    <div className="typing-text">
                        A smarter way to manage your day-to-day: 
                        <span id="typed-text">{typedText}</span>
                        <span className="typing-cursor">|</span>
                    </div>
                </div>
                
                {/* Buttons */}
                <div className="hero-buttons">
                    <a href="#workspace" className="btn btn-primary">Start FirstMate</a>
                    <a href="#ourservice" className="btn btn-secondary">Discover More</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;