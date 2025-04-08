import React from 'react';
import './contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <h2>Contact Me</h2>
            <form className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="contact-info">
                <h3>Or reach me at:</h3>
                <p>Email: <a href="mailto:uniquelimbu2002@gmail.com">uniquelimbu2002@gmail.com</a></p>
            </div>
        </section>
    );
};

export default Contact;