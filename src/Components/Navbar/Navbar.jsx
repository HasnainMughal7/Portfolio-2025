import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActiveClass = (path) => location.pathname === path;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav>
            <div className="NavBox">
                <NavLink to="/" className="logoBox">
                    <h2>
                        Hasnain <span className="logo-gold">Mughal</span>
                    </h2>
                </NavLink>

                <div className="navBtnsBox desktop-menu">
                    <NavLink to="/" className={isActiveClass("/") ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/projects" className={isActiveClass("/projects") ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
                    <NavLink to="/about" className={isActiveClass("/about") ? 'nav-link active' : 'nav-link'}>About</NavLink>
                    <NavLink to="/contact" className="Navbtn">Get a Quote</NavLink>
                </div>

                <div className="mobile-menu-icon" onClick={toggleMenu}>
                    {isOpen ? (
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </div>

                <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
                    <div className="mobile-nav-links">
                        <NavLink to="/" onClick={closeMenu} className={isActiveClass("/") ? 'mobile-link active' : 'mobile-link'}>Home</NavLink>
                        <NavLink to="/projects" onClick={closeMenu} className={isActiveClass("/projects") ? 'mobile-link active' : 'mobile-link'}>Projects</NavLink>
                        <NavLink to="/about" onClick={closeMenu} className={isActiveClass("/about") ? 'mobile-link active' : 'mobile-link'}>About</NavLink>
                        <NavLink to="/contact" onClick={closeMenu} className="Navbtn">Get a Quote</NavLink>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;