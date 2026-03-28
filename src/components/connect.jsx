import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiDownload } from "react-icons/fi";
import DotGrid from "./background-hero";
import resumeFile from "../assets/Resume-Gowtham.pdf";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

const Connect = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1, y: 0,
          duration: 1.2, stagger: 0.1, ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="Connect" className="cinematic-section connect-section" ref={sectionRef}>
      <div className="connect-glow"></div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.7 }}>
        <DotGrid style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="connect-container" ref={textRef}>
        <h2 className="huge-heading">LET'S BUILD</h2>
        <h2 className="huge-heading outline-text">THE FUTURE.</h2>

        <div className="social-links">
          <a
            href={resumeFile}
            download="Gowtham_Resume.pdf"
            className="social-pill"
            style={{ borderColor: "#5227FF", background: "rgba(82, 39, 255, 0.05)" }}
          >
            <FiDownload style={{ color: "#5227FF" }} /> Resume
          </a>
          <a href="https://github.com/Gowthamsai-k" className="social-pill"><FiGithub /> GitHub</a>
          <a href="https://www.linkedin.com/in/gowtham-sai-k-54b8462a4/" className="social-pill"><FiLinkedin /> LinkedIn</a>
          <a
            href="mailto:gowthamsai0519@gmail.com"
            className="social-pill"
          ><FiMail /> Email
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} AI/ML Engineer. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Connect;