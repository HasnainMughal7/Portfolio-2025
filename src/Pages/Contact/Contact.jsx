import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
        services: []
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleService = (service) => {
        if (formData.services.includes(service)) {
            setFormData({
                ...formData,
                services: formData.services.filter((s) => s !== service),
            });
        } else {
            setFormData({ ...formData, services: [...formData.services, service] });
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        const serviceID = "service_pzt7sbk";
        const template1ID = "template_0dnbe2p";
        const template2ID = "template_3ihtyg2";
        const publicKey = "L-DTeUKmb52gHykiT";

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            company: formData.company,
            budget: formData.budget,
            services: formData.services.join(", "),
            message: formData.message,
        };

        const template2Params = {
            from_name: formData.name,
            from_email: formData.email
        }

        emailjs.send(serviceID, template1ID, templateParams, publicKey)
            .then((res) => {
                emailjs.send(serviceID, template2ID, template2Params, publicKey)
                    .then((response) => {
                        setStatus("Success");
                    }, (err) => {
                        console.log("FAILED...", err);
                        setStatus("Error");
                    });
                setFormData({ name: "", email: "", company: "", message: "", budget: "", services: [] });
            }, (err) => {
                console.log("FAILED...", err);
                setStatus("Error");
            });
    };

    return (
        <div className="contact-wrapper">
            <div className="background-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <div className="contact-form-container">

                <div className="form-title">
                    <h1>Let's bring your vision to life</h1>
                    <p>Fill out the form below and I'll get back to you within 24 hours.</p>
                </div>

                <form ref={form} onSubmit={sendEmail}>

                    <div className="input-group">
                        <input
                            type="text" name="name" placeholder="What's your name?"
                            className="styled-input" required
                            value={formData.name} onChange={handleChange}
                        />
                        <input
                            type="email" name="email" placeholder="What's your email?"
                            className="styled-input" required
                            value={formData.email} onChange={handleChange}
                        />
                        <input
                            type="text" name="company" placeholder="What's your company name?"
                            className="styled-input"
                            value={formData.company} onChange={handleChange}
                        />
                    </div>

                    <label className="section-label">How can I help you?</label>
                    <div className="options-grid">
                        {["Web Design", "Development", "App Design", "Consultation"].map((service) => (
                            <div
                                key={service}
                                className={`option-card ${formData.services.includes(service) ? "selected" : ""}`}
                                onClick={() => toggleService(service)}
                            >
                                {service}
                            </div>
                        ))}
                    </div>

                    <label className="section-label">What's your budget?</label>
                    <div className="budget-options">
                        {["<$1k", "$1k-$5k", "$5k-$10k", "$10k+"].map((budget) => (
                            <label key={budget} style={{ cursor: "pointer" }}>
                                <input
                                    type="radio"
                                    name="budget"
                                    value={budget}
                                    className="budget-radio"
                                    onChange={handleChange}
                                    checked={formData.budget === budget}
                                />
                                <span className="budget-label">{budget}</span>
                            </label>
                        ))}
                    </div>

                    <label className="section-label">Anything else I should know?</label>
                    <textarea
                        name="message"
                        rows="4"
                        className="styled-input"
                        placeholder="Tell me about your project details..."
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>

                    <button type="submit" className="submit-btn" disabled={status === "Sending..." || status === "Success"}>
                        {status === "Sending..." ? "Sending..." : status === "Success" ? "Message Sent!" : "Start Project"}
                    </button>

                    {status === "Error" && <p style={{ color: 'red', marginTop: '10px' }}>Something went wrong. Please try again.</p>}

                </form>
            </div>
        </div>
    );
};

export default Contact;