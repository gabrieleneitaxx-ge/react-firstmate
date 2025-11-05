import React, { useState, useEffect } from 'react';
import './Hero.css'; // Use the same CSS file for styling

const images = [
    '/hero-bgs/officemate.jpg',
    'https://images.unsplash.com/photo-1556740758-90de37424649', // Office workflow
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085', // Tech/Abstract code
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952', // Team/
    '/hero-bgs/seaworkerman.webp',
    
];

const ImageCarousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Effect to cycle images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => 
                (prevIndex + 1) % images.length
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="image-carousel-container">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            {/* This overlay helps the text stand out over busy backgrounds */}
            <div className="carousel-overlay"></div>
        </div>
    );
};

export default ImageCarousel;