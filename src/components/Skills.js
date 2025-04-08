import React from 'react';
import skillsData from '../data/skills.json';
import './skills.css';

const Skills = () => {
    return (
        <section className="skills">
            <h2>Technical Skills</h2>
            <ul className="skills-list">
                {skillsData.map((skill, index) => (
                    <li key={index} className="skill-item">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Skills;