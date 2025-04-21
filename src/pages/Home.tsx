import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const sectionsData = [
    { id: "about", name: "About Me" },
    { id: "experience", name: "Experience" },
    { id: "projects", name: "Projects" },
    { id: "projects II", name: "Projects II" },
    { id: "entreprise", name: "Entreprise" },
];

const projectCardsData = [
    {
        title: "Flixit",
        subtitle: "Multimedia Hub",
        date: "Jan 2025",
        description: "Watch anime, access its details, play games, and manage your media",
        tech: ["React", "Nest.js", "PostgreSQL"],
        pdf: "Test.pdf",
    },
    {
        title: "R-Type",
        subtitle: "Coop Space Shooter",
        date: "Nov 2024",
        description: "Team up in this multiplayer R-Type remake to stop unyielding alien forces.",
        tech: ["C++", "Asio", "SFML", "Raylib"],
        pdf: "zikibi.pdf",
    },
];

const projectCardsData2 = [
    {
        title: "Frenchie SHore",
        subtitle: "Multimedia Hub",
        date: "Jan 2025",
        description: "Watch anime, access its details, play games, and manage your media",
        tech: ["React", "Nest.js", "PostgreSQL"],
        pdf: "Test.pdf",
    },
    {
        title: "R-Type",
        subtitle: "Coop Space Shooter",
        date: "Nov 2024",
        description: "Team up in this multiplayer R-Type remake to stop unyielding alien forces.",
        tech: ["C++", "Asio", "SFML", "Raylib"],
        pdf: "zikibi.pdf",
    },
 ];

const experiencesData = [
    {
        company: "Tech Innovators Inc.",
        position: "Senior Full-Stack Developer",
        date: "Jan 2023 - Present",
        description:
            "Leading a team to build scalable web applications using React, Node.js, and cloud services.",
        tech: ["React", "Node.js", "AWS"],
    },
    {
        company: "Digital Solutions",
        position: "Software Engineer",
        date: "May 2020 - Dec 2022",
        description:
            "Developed robust backend services and integrated dynamic front-end solutions using modern JavaScript frameworks.",
        tech: ["JavaScript", "Express", "Mongolien"],
    },
];

const Home: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const sectionElements = container.querySelectorAll(".section");
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = container.scrollTop;
                    const containerHeight = container.scrollHeight - container.clientHeight;
                    const scrolled = (scrollTop / containerHeight) * 100;
                    setScrollProgress(scrolled);

                    let currentSection = "";
                    sectionElements.forEach((section) => {
                        const rect = section.getBoundingClientRect();
                        const containerTop = container.getBoundingClientRect().top;
                        if (rect.top - containerTop <= 150 && rect.bottom - containerTop >= 150) {
                            currentSection = section.id;
                        }
                    });
                    setActiveSection(currentSection);
                    ticking = false;
                });
                ticking = true;
            }
        };

        container.addEventListener("scroll", handleScroll, { passive: true });
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        event.preventDefault();
        const container = scrollContainerRef.current;
        if (!container) return;
        const position = index * 1000;
        container.scrollTo({
            top: position,
            behavior: "smooth",
        });
    };

    return (
        <div className="home">
            <div className="scroll-indicator" style={{ width: `${scrollProgress}%` }}></div>

            <aside className="left-content">
                <div className="intro-section">
                    <h1 className="name">Panic Aleksa</h1>
                    <h2 className="tagline">Full-Stack Developer</h2>
                    <p className="bio">Crafting digital experiences, when code meets creativity.</p>
                </div>
                <nav className="side-nav">
                    <ul>
                        {sectionsData.map((section, index) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className={activeSection === section.id ? "active" : ""}
                                    onClick={(e) => handleNavClick(e, index)}
                                >
                                    {section.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="social-icons">
                    <a href="https://github.com/Kasprrrr" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon fontSize="large" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/aleksa-panic-6655ba262/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedInIcon fontSize="large" />
                    </a>
                </div>
            </aside>

            <main className="right-content" ref={scrollContainerRef}>
                <div className="slide-arrow">
                    <KeyboardArrowDownIcon fontSize="large" />
                </div>
                <section id="about" className="section about">
                    <h2>About Me</h2>
                    <p>
                        I'm a full stack developer passionate about building intuitive, efficient
                        web applications. My journey in tech has been driven by curiosity and a
                        desire to create seamless digital experiences. I believe in the power of
                        combining elegant design with solid engineering.
                    </p>
                    <p>
                        Although I'm still early in my career, I've had the opportunity to work on
                        projects that challenged me on both the front-end and back-end. From small
                        personal initiatives to collaborative team projects, these experiences have
                        broadened my skill set and deepened my understanding of software
                        development.
                    </p>
                    <p>
                        In my spare time, I embrace competition and always aim to be the best at
                        what I do. Whether it's gaming or any other challenge, I enjoy testing my
                        limits and continually pushing for excellence.
                    </p>
                </section>

                <section id="experience" className="section experience">
                    <h2>Experience</h2>
                    <div className="experiences-container">
                        {experiencesData.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{exp.position}</h3>
                                    <span className="date">{exp.date}</span>
                                </div>
                                <span className="company">{exp.company}</span>
                                <p>{exp.description}</p>
                                {exp.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {exp.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="projects" className="section experience">
                    <h2>Projects</h2>
                    <div className="project-list">
                        {projectCardsData.map((project, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{project.title}</h3>
                                    <a href={project.pdf} target="_blank" rel="noopener noreferrer">Voir le PDF
                                    </a>
                                    <span className="date">{project.date}</span>
                                </div>
                                <span className="company">{project.subtitle}</span>
                                <p>{project.description}</p>
                                {project.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section id="projects II" className="section experience">
                    <h2>Projects</h2>
                    <div className="project-list">
                        {projectCardsData2.map((project, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{project.title}</h3>
                                    <a href={project.pdf} target="_blank" rel="noopener noreferrer">Voir le PDF
                                    </a>
                                    <span className="date">{project.date}</span>
                                </div>
                                <span className="company">{project.subtitle}</span>
                                <p>{project.description}</p>
                                {project.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                <section id="entreprise" className="section experience">
                    <h2>Projects</h2>
                    <div className="project-list">
                        {projectCardsData2.map((project, index) => (
                            <div key={index} className="experience-item">
                                <div className="header">
                                    <h3>{project.title}</h3>
                                    <a href={project.pdf} target="_blank" rel="noopener noreferrer">Voir le PDF
                                    </a>
                                    <span className="date">{project.date}</span>
                                </div>
                                <span className="company">{project.subtitle}</span>
                                <p>{project.description}</p>
                                {project.tech.length > 0 && (
                                    <div className="tech-stack">
                                        {project.tech.map((tech, i) => (
                                            <span key={i} className="tech">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
