import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "AI PREDICTIVE ENGINE",
    desc: "Machine learning model predicting real-time data trends with 98% accuracy.",
    img: "https://via.placeholder.com/600x400/111111/5227FF?text=AI+ENGINE",
    github: "#",
    live: "#"
  },
  {
    title: "NEURAL CHATBOT",
    desc: "Realtime NLP conversational agent built with PyTorch and WebSockets.",
    img: "https://via.placeholder.com/600x400/111111/5227FF?text=NEURAL+CHAT",
    github: "#",
    live: "#"
  },
  {
    title: "DATA SYNTHESIZER",
    desc: "High-performance analytics dashboard generating synthetic datasets.",
    img: "https://via.placeholder.com/600x400/111111/5227FF?text=SYNTHESIZER",
    github: "#",
    live: "#"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { autoAlpha: 0, y: 100 },
          {
            autoAlpha: 1, y: 0,
            duration: 1.2, ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );

        // Individual Image Parallax Effect
        const img = card.querySelector('.project-img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -15, scale: 1.15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section className="cinematic-section projects-section" id="Projects" ref={sectionRef}>
      <h2 className="section-heading center-heading">SELECTED WORKS.</h2>

      <div className="projects-grid">
        {projectsData.map((proj, idx) => (
          <div className="project-cinematic-card" key={idx} ref={addToRefs}>
            <div className="project-img-wrapper">
              <img src={proj.img} alt={proj.title} className="project-img" />
              <div className="project-overlay">
                <a href={proj.github} target="_blank" rel="noreferrer" className="icon-link"><FiGithub /></a>
                <a href={proj.live} target="_blank" rel="noreferrer" className="icon-link"><FiExternalLink /></a>
              </div>
            </div>
            <div className="project-info">
              <h3 className="project-title">{proj.title}</h3>
              <p className="project-desc">{proj.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;