import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiMongodb } from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { FiAward } from 'react-icons/fi';
import DotGrid from './background-hero';
import './skills.css';

gsap.registerPlugin(ScrollTrigger);

const techSkills = [
  { name: 'Python', level: 95 },
  { name: 'Java (DSA)', level: 90 },
  { name: 'FastAPI', level: 88 },
  { name: 'SQL', level: 86 },
  { name: 'MongoDB', level: 85 },
  { name: 'Docker', level: 80 },
  { name: 'GitHub', level: 92 },
  { name: 'Linux', level: 87 },
  { name: 'PyTorch', level: 81 },
];

const certifications = [
  {
    id: 'mongo-cert',
    name: 'MongoDB Associate Developer',
    url: 'https://www.credly.com/badges/c01d6ca1-05b1-4359-b093-68b788e2a129',
    description: 'Verified hands-on MongoDB data engineering and Python integration expertise.',
    icon: <SiMongodb className="cert-logo mongo-color" />,
  },
  {
    id: 'aws-cert',
    name: 'AWS Cloud Practitioner',
    url: 'https://www.credly.com/badges/c5965c28-e135-4314-85fc-ff423152dd6a',
    description: 'Foundational cloud knowledge and AWS service understanding.',
    icon: <FaAws className="cert-logo aws-color" />,
  },
];

const patent = {
  id: 'patent',
  name: 'Granted Design Patent for SMART NECKBAND FOR POSTURE ONITORING AND THERAPEUTIC MASSAGE',
  url: 'https://drive.google.com/file/d/1mFxKyUI_EixmypSuxbYL852ZWCYBsCw4/view?usp=sharing',
  description: 'Issued patent for an innovative software engineering solution.',
  icon: <FiAward className="cert-logo patent-color" />,
};

function Skills() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 100, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLink = (url) => {
    if (!url || url === '#') {
      window.alert('URL not configured yet. Update the link in skills.jsx');
      return;
    }
    window.open(url, '_blank', 'noreferrer');
  };

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="Skills" className="cinematic-section skills-section" ref={sectionRef}>
      <div className="skills-background">
        <DotGrid style={{ width: '100%', height: '100%', opacity: 0.5 }} />
      </div>

      <div className="section-header">
        <h2 className="huge-heading">MASTERY &</h2>
        <h2 className="huge-heading outline-text">RECOGNITION.</h2>
        <p className="cinematic-subtext" style={{ margin: '2rem auto', maxWidth: '700px' }}>
          A specialized toolkit focused on robust backend engineering, cloud-native deployments, and advanced data modeling.
        </p>
      </div>

      <div className="cards-grid">
        <article className="skill-card skill-card--wide" ref={addToRefs}>
          <h3>Technical Expertise</h3>
          <div className="skill-bars-grid">
            {techSkills.map((skill) => (
              <div key={skill.name} className="skill-bar-row">
                <div className="skill-bar-label">
                  <span>{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-meter">
                  <div className="skill-meter-fill" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="skill-card" ref={addToRefs}>
          <h3>Certifications</h3>
          <div className="cert-list">
            {certifications.map((cert) => (
              <button
                key={cert.id}
                onClick={() => handleLink(cert.url)}
                className="cert-item-vibe"
                type="button"
              >
                <div className="cert-content-wrapper">
                  <div className="cert-icon-box">{cert.icon}</div>
                  <div className="cert-text">
                    <strong>{cert.name}</strong>
                    <span>{cert.description}</span>
                  </div>
                </div>
                <span className="arrow">↘</span>
              </button>
            ))}
          </div>
        </article>

        <article
          className="skill-card patent-card"
          onClick={() => handleLink(patent.url)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' ? handleLink(patent.url) : null)}
          ref={addToRefs}
        >
          <h3>Innovation (Patent)</h3>
          <div className="achievement-block-vibe">
            <div className="cert-content-wrapper">
              <div className="cert-icon-box">{patent.icon}</div>
              <div className="cert-text">
                <strong>{patent.name}</strong>
                <span>{patent.description}</span>
              </div>
            </div>
            <span className="arrow">↘</span>
          </div>
        </article>
      </div>
    </section>
  );
}

export default Skills;
