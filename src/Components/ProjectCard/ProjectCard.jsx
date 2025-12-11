import React from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard.jsx";
import "./ProjectCard.css";

const ProjectCard = ({ mousePos, title, description, image, tags, link }) => {
  return (
    <SpotlightCard mousePos={mousePos} className="project-card-container">
      
      <div className="project-content-wrapper">     
        <a href={link} target="_blank" rel="noopener noreferrer" className="browser-mockup">
          
          <div className="browser-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          
          <img src={image} alt={title} className="project-img" />
        </a>

        <div className="project-info">
          <h3 className="project-title">{title}</h3>
          <p className="project-desc">{description}</p>
          
          <div className="project-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        </div>

      </div>

    </SpotlightCard>
  );
};

export default ProjectCard;