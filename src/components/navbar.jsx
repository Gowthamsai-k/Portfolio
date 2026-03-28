import React, { useState, useRef, useEffect } from "react";
import "../index.css";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [style, setStyle] = useState({});
  const linksRef = useRef([]);

  const navItems = [
    { name: "Home", link: "#" },
    { name: "About", link: "#About" },
    { name: "Projects", link: "#Projects" },
    { name: "Connect", link: "#Connect" },

  ];

  const updateUnderline = () => {
    const current = linksRef.current[activeIndex];
    if (current) {
      setStyle({
        width: current.offsetWidth + "px",
        left: current.offsetLeft + "px",
      });
    }
  };

  // 1. Update the underline style whenever activeIndex changes
  useEffect(() => {
    setTimeout(updateUnderline, 50);
    window.addEventListener("resize", updateUnderline);

    return () => {
      window.removeEventListener("resize", updateUnderline);
    }
  }, [activeIndex]);

  // 2. Setup IntersectionObserver once on mount to detect scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Detects when section is basically in the top half of screen
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = `#${entry.target.id}`;
          const index = navItems.findIndex(item => item.link === sectionId || (sectionId === "#Home" && item.link === "#"));
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Grab all section DOM nodes and observe them after a tiny delay
    setTimeout(() => {
      const sections = ["Home", "About", "Projects", "Connect"].map(id => document.getElementById(id));
      sections.forEach(section => {
        if (section) observer.observe(section);
      });
    }, 500);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="navbar-wrapper">
      <div className="navbar">



        <div className="nav-links-container">
          <div className="nav-links">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                ref={(el) => (linksRef.current[index] = el)}
                className={activeIndex === index ? "active" : ""}
                onClick={() => setActiveIndex(index)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Animated underline */}
          <span className="underline" style={style}></span>
        </div>



      </div>
    </nav>
  );
};

export default Navbar;