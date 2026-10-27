import { useEffect, useState } from 'react';
import projectsData from './data/projects.json';
import timelineData from './data/timeline.json';
import faqData from './data/faq.json';

function App() {
  const [projects, setProjects] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [faq, setFaq] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setProjects(projectsData);
    setTimeline(timelineData);
    setFaq(faqData);
  }, []);

  useEffect(() => {
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  const visibleProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedFilter);

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>

      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Goltrand Boukoumou, accueil">
          <span className="brand-mark" aria-hidden="true">G<span>.</span></span>
          <span>Goltrand Boukoumou</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="navigation"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
        <nav className={`navigation ${isMenuOpen ? 'is-open' : ''}`} id="navigation" aria-label="Navigation principale">
          <a href="#projets" onClick={() => setIsMenuOpen(false)}>Projets</a>
          <a href="#apropos" onClick={() => setIsMenuOpen(false)}>À propos</a>
          <a href="#parcours" onClick={() => setIsMenuOpen(false)}>Parcours</a>
          <a href="#faq" onClick={() => setIsMenuOpen(false)}>Questions</a>
          <a className="nav-contact" href="#contact" onClick={() => setIsMenuOpen(false)}>On se parle <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="hero-title">
          <picture>
            <source media="(max-width: 640px)" srcSet="./Documents/HeroPortfolio03.webp" />
            <source media="(max-width: 900px)" srcSet="./Documents/HeroPortfolio02.webp" />
            <img className="hero-image" src="./Documents/HeroPortfolio01.webp" alt="Goltrand Boukoumou, développeur web full-stack" fetchPriority="high" />
          </picture>

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot"></span> Développeur web full-stack · Pointe-Noire, République du Congo</p>
              <h1 id="hero-title">Je transforme<br />les idées en <span>produits<br className="desktop-break" /> numériques.</span></h1>
              <p className="hero-intro">Salut, moi c’est Goltrand. Je conçois et développe des expériences web rapides, accessibles et pensées pour les gens qui les utilisent.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projets">Voir mes projets <span aria-hidden="true">↓</span></a>
                <a className="button button-quiet" href="mailto:goltrandmissou@gmail.com">Discutons <span aria-hidden="true">↗</span></a>
              </div>
              <div className="hero-meta">
                <span>Pointe-Noire, République du Congo</span>
              </div>
            </div>
          </div>

          <a className="scroll-hint" href="#projets"><span className="scroll-line"></span> FAITES DÉFILER</a>
        </section>

        <section className="projects section-wrap" id="projets" aria-labelledby="projects-title">
          <div className="section-heading">
            <div><p className="eyebrow">PROJETS & EXPLORATIONS</p><h2 id="projects-title">Des idées <span>en action.</span></h2></div>
            <p>Un projet réalisé et des concepts d’interface clairement présentés comme des démonstrations.</p>
          </div>

          <div className="project-filters" role="group" aria-label="Filtrer les projets">
            {[
              { id: 'all', label: 'Tout', count: 4 },
              { id: 'web', label: 'Web app', count: 3 },
              { id: 'design', label: 'UI / UX', count: 1 },
            ].map((filter) => (
              <button
                key={filter.id}
                className={`filter-button ${selectedFilter === filter.id ? 'is-active' : ''}`}
                type="button"
                data-filter={filter.id}
                aria-pressed={selectedFilter === filter.id}
                onClick={() => setSelectedFilter(filter.id)}
              >
                {filter.label} <span>{filter.count}</span>
              </button>
            ))}
          </div>

          <div className="project-grid" aria-live="polite">
            {visibleProjects.map((project) => (
              <article key={project.id} className={`project-card ${project.featured ? 'project-featured' : ''}`} data-category={project.category}>
                <a
                  className={`project-art ${project.artClass}`}
                  href={project.href}
                  aria-label={project.ariaLabel}
                  target={project.repoHref ? '_blank' : undefined}
                  rel={project.repoHref ? 'noreferrer' : undefined}
                >
                  {project.image ? (
                    <img
                      className="project-preview-image"
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                    />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: project.content }} />
                  )}
                  <span className="art-label">{project.label}</span>
                  <span className="art-open" aria-hidden="true">↗</span>
                </a>
                <div className="project-info">
                  <div>
                    <p className="project-type">{project.type}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <div className="project-meta">
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>
                    {project.repoHref && (
                      <a className="project-source-link" href={project.repoHref} target="_blank" rel="noreferrer">
                        Code source <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="apropos" aria-labelledby="about-title">
          <div className="about-layout section-wrap">
            <div className="about-stamp"><span>GB</span><small>DÉVELOPPEUR<br />WEB FULL-STACK</small><i>✳</i></div>
            <div className="about-copy">
              <p className="eyebrow">UN PEU PLUS SUR MOI</p>
              <h2 id="about-title">Le bon code.<br />La <span>bonne intention.</span></h2>
              <p>Je suis développeur web full-stack intermédiaire, basé à Pointe-Noire, en République du Congo.</p>
              <p>Ce portfolio présente mon profil, un projet réalisé et des concepts d’interface de démonstration.</p>
              <a className="text-arrow" href="https://github.com/goltrand-boukoumou" target="_blank" rel="me">Voir mon profil GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="journey section-wrap" id="parcours" aria-labelledby="journey-title">
          <div className="section-heading">
            <div><p className="eyebrow">MON PARCOURS</p><h2 id="journey-title">Un chemin <span>qui continue.</span></h2></div>
            <p>Développement web, approche full-stack et ancrage à Pointe-Noire.</p>
          </div>

          <div className="timeline" aria-live="polite">
            {timeline.map((item) => (
              <article key={item.label} className="timeline-item">
                <span className="timeline-year">{item.label}</span>
                <span className="timeline-dot" aria-hidden="true"></span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="faq section-wrap" id="faq" aria-labelledby="faq-title">
          <div className="section-heading">
            <div><p className="eyebrow">INFORMATIONS PRATIQUES</p><h2 id="faq-title">Quelques <span>réponses.</span></h2></div>
            <p>À propos du profil, des concepts présentés et du moyen de contact.</p>
          </div>

          <div className="faq-list" aria-live="polite">
            {faq.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner section-wrap">
            <p className="eyebrow"><span className="status-dot"></span> CONTACT DIRECT</p>
            <h2 id="contact-title">On fait quelque chose<br /><span>de bien ensemble ?</span></h2>
            <a className="contact-link" href="mailto:goltrandmissou@gmail.com">goltrandmissou@gmail.com <span aria-hidden="true">↗</span></a>
            <div className="contact-note"><span>Pas de formulaire compliqué.</span><span>Juste un bonjour, ça suffit.</span></div>
            <div className="contact-decoration" aria-hidden="true">✳</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#accueil" aria-label="Goltrand Boukoumou, retour en haut"><span className="brand-mark">G<span>.</span></span><span>Goltrand Boukoumou</span></a>
        <p>Conçu et développé avec soin <span aria-hidden="true">✳</span></p>
        <div className="footer-links"><a href="https://github.com/goltrand-boukoumou" target="_blank" rel="me">GitHub ↗</a><a href="./confidentialite.html">Confidentialité</a><span>© <span id="current-year">2025</span> Goltrand Boukoumou</span></div>
      </footer>
      <a className="mobile-contact" href="mailto:goltrandmissou@gmail.com">Contacter Goltrand <span aria-hidden="true">↗</span></a>
    </>
  );
}

export default App;
