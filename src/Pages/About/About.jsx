import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "../../Components/SpotlightCard/SpotlightCard";
import { NavLink } from "react-router-dom";
import "./About.css";

const About = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const skillRef = useRef(null);
    const isSkillInView = useInView(skillRef, { once: true, margin: "-100px" });

    const timelineRef = useRef(null);
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });

    const skills = [
        { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Supabase", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
        { name: "NextJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
        { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "TypeScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Tailwind", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "NodeJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "ReactJS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "HTML", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    ];

    const experience = [
        { year: "2023", role: "Completed Matriculation", company: "" },
        { year: "2023", role: "Completed Frontend", company: "Self Study" },
        { year: "2024", role: "Completed Backend", company: "Self Study" },
        { year: "2025", role: "Completed Intermediate", company: "In Computer Science" },
        { year: "2025", role: "Got Enrolled In FAST - NUCES", company: "" },
    ];

    return (
        <div className="about-wrapper">

            <div className="background-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <section className="about-hero">
                <motion.div
                    className="about-text"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>About <span className="highlight">Me.</span></h1>
                    <p>
                        I'm Hasnain Mughal, a passionate Full-Stack Developer based in Pakistan.
                        I specialize in building high-quality websites and applications that
                        combine robust functionality with aesthetic design.
                    </p>
                    <p>
                        With a background in "Making things look cool", I strive to create
                        digital experiences that leave a lasting impression.
                    </p>
                    <button className="btn-primary">Download CV</button>
                </motion.div>

                <motion.div
                    className="about-image-box"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img
                        src="/assets/mypic.jpg"
                        alt="Hasnain"
                        className="profile-pic"
                    />
                </motion.div>
            </section>

            <section className="skills-section" ref={skillRef}>
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isSkillInView ? { opacity: 1, y: 0 } : {}}
                >
                    My <span className="highlight">Arsenal</span>
                </motion.h2>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isSkillInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <SpotlightCard mousePos={mousePos} className="skill-card">
                                <div className="skill-card-content">
                                    <img
                                        src={skill.img}
                                        alt={skill.name}
                                        className="skill-img"
                                        style={skill.invert ? { filter: 'invert(1)' } : {}}
                                    />
                                    <h3>{skill.name}</h3>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="experience-section" ref={timelineRef}>
                <h2 className="section-title">The <span className="highlight">Journey</span></h2>

                <div className="timeline-container">

                    <div className="timeline-line"></div>

                    <div
                        className="timeline-progress"
                        style={{ width: isTimelineInView ? "100%" : "0%" }}
                    ></div>

                    <div className="timeline-items">
                        {experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? "t-top" : "t-bottom"}`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isTimelineInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.5 + (index * 0.2) }}
                            >
                                <div className="timeline-dot"></div>
                                <div className="t-year">{exp.year}</div>
                                <div className="t-role">{exp.role}</div>
                                <div className="t-company">{exp.company}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="connect-section">
                <h2 className="section-title">Let's <span className="highlight">Connect</span></h2>
                <div className="socials-grid">

                    <a href="https://www.linkedin.com/in/muhammad-hasnain7" className="social-card" target="_blank">
                        <svg className="social-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                        <span>LinkedIn</span>
                    </a>

                    <a href="https://github.com/HasnainMughal7" className="social-card" target="_blank">
                        <svg className="social-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        <span>GitHub</span>
                    </a>

                    <NavLink
                        to="/contact"
                        className="social-card"
                        target="_blank"
                    >
                        <svg className="social-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        <span>Get in Touch</span>
                    </NavLink>

                    <a href="https://x.com/@HasnainHero302" className="social-card" target="_blank">
                        <svg className="social-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                        <span>Twitter</span>
                    </a>

                    <a
                        href="https://www.instagram.com/muhammadhasnainmughal57"
                        target="_blank"
                        className="social-card"
                    >
                        <svg className="social-icon-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        <span>Instagram</span>
                    </a>
                </div>
            </section>

        </div>
    );
};

export default About;