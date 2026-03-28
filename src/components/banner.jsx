import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DotGrid from './background-hero';
import '../index.css';

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
    const containerRef = useRef(null);
    const headingsRef = useRef([]);
    const textRef = useRef(null);
    const linkRef = useRef(null);
    const parallaxGridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Load Reveal Animation
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            tl.fromTo(
                headingsRef.current,
                { y: '120%' },
                { y: '0%', duration: 1.5, stagger: 0.15, delay: 0.2 }
            );

            tl.fromTo(
                [textRef.current, linkRef.current],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
                '-=1'
            );

            // 2. Parallax Scroll Animation
            // Makes the text scroll up faster and the grid fade down/fade out
            const parallaxTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1, // Smooth dragging parallax
                }
            });

            // Parallax the headings up faster
            parallaxTl.to(headingsRef.current, {
                y: -150,
                opacity: 0,
                stagger: 0.05
            }, 0);

            // Parallax the footer paragraphs down and left slightly
            parallaxTl.to([textRef.current, linkRef.current], {
                y: 100,
                x: -50,
                opacity: 0
            }, 0);

            // Give the background grid a subtle drift downward and fade out
            parallaxTl.to(parallaxGridRef.current, {
                y: 200,
                opacity: 0.1
            }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to store refs in array
    const addToRefs = (el) => {
        if (el && !headingsRef.current.includes(el)) {
            headingsRef.current.push(el);
        }
    };

    return (
        <div className="banner-cinematic-section" id="Home" ref={containerRef}>
            <div ref={parallaxGridRef} style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0, zIndex: 1 }}>
                <DotGrid
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </div>

            <div className="banner-cinematic-content">
                <div className="cinematic-hero-text">
                    <div className="line-wrapper">
                        <h1 className="cinematic-heading uppercase" ref={addToRefs}>
                            REDEFINING
                        </h1>
                    </div>
                    <div className="line-wrapper">
                        <h1 className="cinematic-heading uppercase" ref={addToRefs}>
                            INTELLIGENCE.
                        </h1>
                    </div>
                    <div className="line-wrapper">
                        <h1 className="cinematic-heading uppercase" ref={addToRefs}>
                            ENGINEERING
                        </h1>
                    </div>
                    <div className="line-wrapper">
                        <h1 className="cinematic-heading uppercase" ref={addToRefs}>
                            THE FUTURE.
                        </h1>
                    </div>
                </div>

                <div className="cinematic-hero-footer">
                    <div className="cinematic-subtext" ref={textRef}>
                        <p>Crafting advanced artificial intelligence systems and</p>
                        <p>innovative algorithms for high-impact global solutions.</p>
                        <p>Rooted in premium engineering, built for performance.</p>
                    </div>

                    <a href="#projects" className="cinematic-explore" ref={linkRef}>
                        <span className="arrow">↘</span> EXPLORE WORK
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;