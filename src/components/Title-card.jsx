import React, { useRef } from "react";
import "../index.css";

const TiltCard = ({ children }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * 10;
    const rotateY = ((x - midX) / midX) * 10;

    card.style.transform = `
      perspective(800px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  };

  return (
    <div
      ref={cardRef}
      className="tilt-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default TiltCard;