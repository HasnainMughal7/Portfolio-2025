import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import SpotlightCard from "../../Components/SpotlightCard/SpotlightCard.jsx";
import ProjectsGrid from "../../Components/ProjectsGrid/ProjectsGrid.jsx";

const GlobalTorch = ({ pos }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        background: `radial-gradient(
          800px circle at ${pos.x}px ${pos.y}px, 
          rgba(255, 255, 255, 0.07), 
          transparent 50%
        )`,
      }}
    />
  );
};
function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="HomeBox">
      <div className="background-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <GlobalTorch pos={mousePos} />

      <section className="main-wrapper">       
        <SpotlightCard mousePos={mousePos} className="hero-card" style={{border: 'none', background: 'transparent'}}>
          <h1 className="hero-text">
            Code At It's <br />
            <span className="highlight">Finest.</span>
          </h1>
          <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            I am a full-stack developer and CEO of a startup company Mughal Enterprises Ltd.
          </p>
          <div style={{ textAlign: 'center' }}>
            <a href="#pow" className="btn-primary">Learn More</a>
          </div>
        </SpotlightCard>

        <div className="grid-container">
          <SpotlightCard mousePos={mousePos}>
            <h3 style={{ marginTop: 0 }}>Web Design</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
              Making interfaces that look cool.
            </p>
          </SpotlightCard>

          <SpotlightCard mousePos={mousePos}>
            <h3 style={{ marginTop: 0 }}>Development</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
              Clean, scalable Front-end, Back-end, Database, or Application code.
            </p>
          </SpotlightCard>

          <SpotlightCard mousePos={mousePos}>
            <p style={{ fontStyle: 'italic', color: '#ddd' }}>
              "Best design ever."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', gap: '10px' }}>
               <div style={{ width: '30px', height: '30px', background: '#555', borderRadius: '50%' }}></div>
               <div>
                 <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Elon Musk</div>
                 <div style={{ fontSize: '0.7rem', color: '#888' }}>Tech Lead</div>
               </div>
            </div>
          </SpotlightCard>
        </div>

      </section>

      <section id="pow" className="project-overview-wrapper">

        <ProjectsGrid num={2} />

        <div className="pow-Btn">
          <NavLink to="/projects" className="btn-primary">
            Explore All Work
          </NavLink>
        </div>

      </section>

      <section className="services-wrapper">
        <div className="services-box">

          <div className="left-service-box">
            <h1>Why growing businesses choose me</h1>
            <NavLink to="/about" className="sw-btn btn-primary">Explore More About Me</NavLink>
          </div>

          <div className="right-service-box">
            
            <div className="rsbs">
              <div className="rsbs-logo">
                <img src="https://framerusercontent.com/images/0PupopWA9sWRRExc47pAoPEtrlo.png?scale-down-to=1024&width=1685&height=1693" alt="img" />
              </div>
              <div className="rsbs-text">
                <div className="rsbs-text-title">
                  <h2>Always in the loop</h2>
                  <p>I believe in transparent, direct and fast communication.</p>
                </div>
              </div>
            </div>
            
            <div className="rsbs">
              <div className="rsbs-logo">
                <img src="https://framerusercontent.com/images/eolMKDRSEbhZgPypBowmQ6BAms.png?scale-down-to=1024&width=1685&height=1693" alt="img" />
              </div>
              <div className="rsbs-text">
                <div className="rsbs-text-title">
                  <h2>Your vision, my expertise</h2>
                  <p>With me, you can find a solution tailored to your goals.</p>
                </div>
              </div>
            </div>
            
            <div className="rsbs">
              <div className="rsbs-logo">
                <img src="https://framerusercontent.com/images/wvw17qPJfyECgVFb0RLdy4Jy8.png?scale-down-to=1024&width=1685&height=1693" alt="img" />
              </div>
              <div className="rsbs-text">
                <div className="rsbs-text-title">
                  <h2>Efficiency that meets pace</h2>
                  <p>I combine speed with precision, ensuring all deliverables meet the highes standards.</p>
                </div>
              </div>
            </div>
            
            <div className="rsbs">
              <div className="rsbs-logo">
                <img src="https://framerusercontent.com/images/vwK3J1Qfv9M5rsFeTCozyk2k8A.png?scale-down-to=1024&width=1685&height=1693" alt="img" />
              </div>
              <div className="rsbs-text">
                <div className="rsbs-text-title">
                  <h2>Long-term success</h2>
                  <p>I believe in growing together. Over the years, I've built long-term relationships with many partners, some lasting over 3 years. With me, you're gaining a dependable developer that evolves with your needs.</p>
                </div>
              </div>
            </div>
          
          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;