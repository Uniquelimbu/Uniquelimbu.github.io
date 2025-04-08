import React from 'react';
import educationData from '../data/education.json';
import './education.css';

const Education = () => {
    return (
        <section className="education">
            <h2>Education</h2>
            <div className="education-list">
                {educationData.map((item, index) => (
                    <div key={index} className="education-item">
                        <h3>{item.institution}</h3>
                        <p>{item.degree}</p>
                        <p>{item.dates}</p>
                        <p>Coursework: {item.coursework.join(', ')}</p>
                        <p>Certifications: {item.certifications.join(', ')}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Education;