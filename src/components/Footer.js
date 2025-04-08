import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} UNIQUE LIMBU. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com/Uniquelimbu" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://www.linkedin.com/in/uniquelimbu/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://twitter.com/uniquelimbu" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;