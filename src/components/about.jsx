import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myImage from '../assets/hero.png';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image fade/slide up effect
      gsap.fromTo(imageRef.current,
        { autoAlpha: 0, y: 50, scale: 0.95 },
        {
          autoAlpha: 1, y: 0, scale: 1,
          duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Text stagger effect
      gsap.fromTo(textRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1, y: 0,
          duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      );

      // Parallax effect on scroll
      const parallaxTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // Image moves up faster than the scroll
      parallaxTl.to(imageRef.current, { y: -100 }, 0);

      // Text moves down slower
      parallaxTl.to(textRef.current, { y: 80 }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="About" className="cinematic-section about-section" ref={sectionRef}>
      <div className="about-container">
        <div className="about-image-wrapper" ref={imageRef}>
          {/* Placeholder for Profile Profile */}
          <div className="profile-placeholder">
            <img src={myImage} alt="Profile Placeholder" className="profile-img" />
          </div>
        </div>
        <div className="about-text-wrapper" ref={textRef}>
          <h2 className="section-heading">THE ETHOS.</h2>
          <p className="large-paragraph">
            I’m an AI/ML engineer focused on building intelligent systems that solve real-world problems. I work on designing, training, and deploying machine learning models, with a strong interest in scalable architectures and real-time inference.
          </p>
          <p className="small-paragraph">
            My experience includes working with deep learning frameworks like PyTorch, building data pipelines, and integrating ML models into production systems using modern backend technologies. I’m particularly interested in areas like content analysis, automation, and distributed AI systems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;