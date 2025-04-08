import React from 'react';
import experienceData from '../data/experience.json';
import './experience.css';

const Experience = () => {
    return (
        <section className="experience">
            <h2>Experience</h2>
            <div className="experience-list">
                {experienceData.map((job, index) => (
                    <div key={index} className="experience-item">
                        <h3>{job.title}</h3>
                        <h4>{job.company}</h4>
                        <p>{job.date}</p>
                        <ul>
                            {job.responsibilities.map((responsibility, idx) => (
                                <li key={idx}>{responsibility}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;