import React from 'react';
import './Services.css';

const Services = () => {
    
    const workOnstairsImagePath = "/hero-bgs/workonstairs.jpg";

    return (
        <section id="ourservice" className="services-section">
            <div className="container services-header">
                <h2>Our Services</h2>
                <img src={workOnstairsImagePath} alt="A person working efficiently on stairs" className="services-hero-image" />
                <p className="subtitle">COMPREHENSIVE TOOLS TO STREAMLINE YOUR WORKFLOW</p>
            </div>
            
            <div className='container services-grid'>
                
                {/* 1. Notes & Reminders (Core Admin) */}
                <div className='service-card'>
                    <h3>Notes & Reminders</h3>
                    <p>Capture and organize your thoughts with **AI-powered summarization** and smart reminder systems that anticipate your needs.</p>
                </div>

                {/* 2. Financial Management (Admin Tasks) */}
                <div className='service-card'>
                    <h3>Financial Tracking</h3>
                    <p>Effortlessly track budgets, expenses, and invoices. FirstMate auto-categorizes transactions and generates summary reports.</p>
                </div>

                {/* 3. Calendar Integration (Repetitive Duties) */}
                <div className='service-card'>
                    <h3>Smart Scheduling</h3>
                    <p>Seamlessly integrate with your calendar to manage complex scheduling, find optimal meeting times, and handle rescheduling conflicts autonomously.</p>
                </div>

                {/* 4. Communication & Filtering (Backup Support) */}
                <div className='service-card'>
                    <h3>Communication Shield</h3>
                    <p>Filter non-priority communication noise, draft routine responses, and summarize urgent messages while you focus on high-level tasks.</p>
                </div>

                {/* 5. Document Management (Admin Tasks) */}
                <div className='service-card'>
                    <h3>Document Management</h3>
                    <p>Automate file categorization, version control, and retrieval. Ask FirstMate for a document and get it instantly without manual searching.</p>
                </div>

                {/* 6. Travel & Logistics (Repetitive Duties) */}
                <div className='service-card'>
                    <h3>Travel & Logistics</h3>
                    <p>Handle complex travel planning from flights to accommodations, including itinerary generation and real-time flight status monitoring.</p>
                </div>

                {/* 7. Reporting & Analytics (Core Admin) */}
                <div className='service-card'>
                    <h3>Activity Reporting</h3>
                    <p>Get daily, weekly, or monthly summaries of your completed tasks, time allocation, and efficiency metrics, helping you optimize your workflow.</p>
                </div>
                
            </div>
        </section>
    );
};

export default Services;