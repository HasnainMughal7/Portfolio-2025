import { useEffect, useState } from "react";
import ProjectsGrid from "../../Components/ProjectsGrid/ProjectsGrid"
import "./Projects.css"

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
const Projects = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
          setMousePos({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, []);

    return (
        <div className="projects-page-box">
            <div className="background-container">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <GlobalTorch pos={mousePos} />
            <ProjectsGrid />
        </div>
    )
}

export default Projects
