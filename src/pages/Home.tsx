import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PdfViewer from '../components/PdfViewer';

const sectionsData = [
    { id: "about", name: "A propos de moi" },
    { id: "experience", name: "Experience" },
    { id: "cv", name: "CV" },
    { id: "entreprise", name: "Entreprise" },
    { id: "projects", name: "Projects" },
    { id: "projects II", name: "Projects II" },
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
        company: "Mission Micro",
        position: "Alternant Technicien Informatique",
        date: "Août 2023 - Present",
        description:
            "Installation, maintient, dépannage des équipements // Support aux utilisateurs en entreprise.",
        tech: ["Windows", "Linux", "Support"],
    },
    {
        company: "Proman",
        position: "Intérimaire",
        date: "Novembre 2022 - Août 2023",
        description:
            "Reception, mise en rayon et gestion des stocks pour le compte de OCP Répartition",
        tech: ["Manutention", "Stock", "Travail d'équipe"],
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
                    <h1 className="name">Chincholle Franck</h1>
                    <h2 className="tagline">BTS SIO</h2>
                    <p className="bio">Alternance technicien support réseaux et informatique</p>
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
                    <a href="https://github.com/fchincholle" target="_blank" rel="noopener noreferrer">
                        <GitHubIcon fontSize="large" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/franck-chincholle-97583a246/"
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
                    <h2>A propos de moi</h2>
                    <p>
                        Actuellement en BTS SIO en alternance, je me spécialise dans l’option SISR .
                        Passionné par le monde du numérique, je peux développer mes compétences en systèmes et réseaux. 
                    </p>
                    <p>
                        Curieux, rigoureux et toujours motivé à apprendre, j’aime relever de nouveaux défis et travailler sur des projets concrets qui allient technique et créativité.
                    </p>
                    <p>
                        En cette fin de BTS SIO, je suis activement à la recherche d’une alternance en cybersécurité pour approfondir mes compétences et continuer mon cursus dans un secteur en constante évolution.
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

                <section id="cv" className="section about">
                    <h2>Mon CV</h2>
                    <div>
                        <PdfViewer file="/Chincholle_Franck_CV.pdf" />
                    </div>
                </section>

                <section id="about" className="section about">
                    <h2>Entreprise</h2>
                    <h3>Mission Micro</h3>
                    <p>

                        Mission Micro est une entreprise basée à Beauzelle, spécialisée dans les services informatiques adaptés aux besoins des entreprises et des particuliers.
                        Depuis 2005, elle propose des solutions sur mesure en matière de réseaux, systèmes, sécurité informatique et télécoms.
                        Son équipe polyvalente intervient sur des missions variées telles que l’assistance à maîtrise d’ouvrage, la maintenance, le déploiement de postes et la formation des utilisateurs.
                        La collaboration durable entre Mission Micro et Collecte Localisation Satellite se poursuit aujourd’hui, avec pour mission d’assurer un support technique fiable et réactif aux utilisateurs de CLS.

                    </p>
                    <a href="https://www.agencemissionmicro.fr" target="_blank" rel="noopener noreferrer">
                        <img src="https://32c05b15c2.clvaw-cdnwnd.com/a5f998c5006027b58154b034ba58d825/200000000-d245ad3412/MM_logo1_carte%20de%20visite%20B.jpg?ph=32c05b15c2" alt="Logo MM" style={{ width: '60px', marginTop: '5px', marginBottom: '5px' }} />
                    </a>
                    <h3>Collecte Localisation Satellite</h3>
                    <p>

                        CLS est une entreprise française pionnière dans les solutions d'observation et de surveillance de la Terre depuis 1986.
                        CLS déploie des services satellitaires innovants pour comprendre, protéger notre planète et gérer durablement ses ressources.
                        Basée à Toulouse, elle opère dans plus de 30 pays et emploie environ 1 000 collaborateurs.
                        Ses domaines d'expertise couvrent la surveillance environnementale, la gestion durable des pêches, la sécurité maritime, la mobilité et les infrastructures énergétiques.
                        CLS est également l'opérateur exclusif du système Argos, utilisé mondialement pour le suivi d'espèces, de flottes et de données environnementales.
                    </p>
                    <a href="https://www.cls.fr" target="_blank" rel="noopener noreferrer">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Logo_CLS.jpg" alt="Logo CLS" style={{ width: '60px', marginTop: '5px' }} />
                    </a>
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
                
            </main>
        </div>
    );
};

export default Home;
