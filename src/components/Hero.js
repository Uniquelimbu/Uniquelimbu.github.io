import React from 'react';
import './hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Welcome to My Portfolio</h1>
                <p className="hero-subtitle">I'm UNIQUE LIMBU, a passionate Computer Science student and tech enthusiast.</p>
                <a href="#projects" className="hero-button">View My Projects</a>
            </div>
        </div>
    );
};

export default Hero;