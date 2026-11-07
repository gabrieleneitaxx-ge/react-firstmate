import React from 'react';
import './About.css'; 


const About = () => {
    
    const mateWorkerImagePath = "/hero-bgs/mateworker.jpg"; 

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-content">
                    
                    {/* Left Column: Text */}
                    <div className="about-text">
                        <h2>FirstMate</h2>
                        <p className="tagline">
                            <strong>"Personal assistance for the personal assistant"</strong>
                        </p>
                        <p>
                            FirstMate is an <strong>AI-powered assistant</strong> designed to offer secondary support for primary Personal Assistants (PAs). Created by personal assistants, for personal assistants, with simplicity and functionality in mind.
                        </p>
                        <p>
                            It helps manage your workload by taking on <strong>administrative tasks</strong>, handling <strong>repetitive duties</strong>, and providing <strong>backup support</strong> when you're unavailable. This allows you to focus on more complex, high-priority responsibilities, boosting overall efficiency and effectiveness.
                        </p>
                    </div>

                    {/* Right Column: Image */}
                    <div className="about-image">
                        <div className="about-image-placeholder">
                            <img 
                                src={mateWorkerImagePath} 
                                alt="mateworker - AI assistant providing support" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;