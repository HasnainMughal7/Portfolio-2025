import React, { useRef, useState, useEffect } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({ children, className = "", style = {}, mousePos }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: mousePos.x - rect.left, y: mousePos.y - rect.top });
    
    setOpacity(1); 
  }, [mousePos]);

  return (
    <div
      ref={divRef}
      className={`card-container ${className}`}
      style={{
        ...style,
        "--x": `${position.x}px`,
        "--y": `${position.y}px`
      }}
    >
      
      <div
        className="spotlight-glow"
        style={{ opacity }} 
      />

      <div
        className="spotlight-border"
        style={{ opacity }}
      />

      <div className="card-content">{children}</div>
    </div>
  );
};

export default SpotlightCard;