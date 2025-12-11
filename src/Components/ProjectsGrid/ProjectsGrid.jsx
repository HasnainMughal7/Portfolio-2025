import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard.jsx";
import { projects } from "../../../data/data.js";
import "./ProjectsGrid.css";

const ProjectsGrid = ({num}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  let arr;
  if(num === undefined){
    arr = projects;
  } else {
    arr = projects.slice(0, num);
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="projects-wrapper">
      
      <div className="projects-title-box">
        <h1 className="hero-text">
          Explore the <span className="highlight">Projects</span> I've Done
        </h1>
        <p>Here are some of the projects I've worked on.</p>
      </div>

      <div className="projects-grid-container">
        {arr.map((project) => (
          <ProjectCard 
            key={project.id}
            mousePos={mousePos}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            link={project.link}
          />
        ))}
      </div>

    </div>
  );
};

export default ProjectsGrid;